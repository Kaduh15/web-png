import express from 'express'
import path from 'path'

import { getImageSite } from './puppeteer'
import { removeProtocol } from './utils/format-url'
import { getNowDate } from './utils/get-now-date'
import { getPublicFolderFileNames } from './utils/get-public-folder-file-names'

const app = express()
const cache = new Map<string, string>()

getPublicFolderFileNames().then((fileNames) => {
  fileNames.forEach((fileName) => {
    const url = removeProtocol(fileName).replace('/', '').replace('.png', '')
    cache.set(url, getNowDate())
  })
})

app.use(express.json())

app.use((req, res, next) => {
  console.log('🚀 ~ file: index.ts:14 ~ cache:', cache)
  next()
})

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', async (req, res) => {
  const url = req.query.url as string
  const noCache = Boolean(req.query['no-cache'])
  const urlWithoutProtocol = removeProtocol(url).replace('/', '')

  const hasImage = cache.has(urlWithoutProtocol)

  if (hasImage && !noCache) {
    return res
      .status(200)
      .sendFile(
        path.join(
          __dirname,
          `/public/${removeProtocol(url).replace('/', '')}.png`,
        ),
      )
  }

  await getImageSite(url)

  cache.set(urlWithoutProtocol, getNowDate())

  res
    .status(200)
    .sendFile(
      path.join(
        __dirname,
        `/public/${removeProtocol(url).replace('/', '')}.png`,
      ),
    )
})

app.listen(3000, () => {
  console.log('Server is running')
})
