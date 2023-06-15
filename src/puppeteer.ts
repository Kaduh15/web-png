import puppeteer from 'puppeteer'

import { removeProtocol } from './utils/format-url'

/**
 * This function takes a URL, launches a headless browser, takes a screenshot of the website, and saves
 * it as a PNG file in a specified directory.
 * @param {string} url - The URL of the website from which an image needs to be captured.
 */
export async function getImageSite(url: string) {
  let newUrl: string = url
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    newUrl = `http://${url}`
  }
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  await page.goto(newUrl)

  const imageName = removeProtocol(newUrl).replace('/', '')
  await page.screenshot({
    path: `./src/public/${imageName}.png`,
    type: 'png',
  })

  await browser.close()
}
