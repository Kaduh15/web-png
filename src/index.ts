import express from 'express'
import path from 'path'

import { getImageSite } from './puppeteer'
import { removeProtocol } from './utils/format-url'
import { getNowDate } from './utils/get-now-date'
import { getPublicFolderFileNames } from './utils/get-public-folder-file-names'

import 'dotenv/config'

console.log('🚀 ~ file: index.ts:12 ~ process.env.PORT:', process.env.PORT)

const PORT = process.env.PORT || 3000

const app = express()
const cache = new Map<string, string>()

getPublicFolderFileNames().then((fileNames) => {
  fileNames.forEach((fileName) => {
    const url = removeProtocol(fileName).replace('/', '').replace('.png', '')
    if (url.startsWith('index.')) return
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
  const hasUrl = Boolean(url)

  if (!hasUrl) {
    return res.status(400).json({ error: 'Missing URL query parameter.' })
  }

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

app.listen(PORT, () => {
  console.log('Server is running')
})
