import puppeteer from 'puppeteer'

import { removeProtocol } from './utils/format-url'

/**
 * This function takes a URL, launches a headless browser, navigates to the URL, takes a screenshot of
 * the page, and saves it to a specified directory.
 * @param {string} url - The URL of the website to take a screenshot of.
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
  console.log(`Go to ${newUrl}`)

  const imageName = removeProtocol(newUrl).replace('/', '')
  await page.screenshot({
    path: `./src/public/${imageName}.png`,
    fullPage: true,
  })
  console.log(`Take screenshot and save it to ./src/public/${imageName}.png`)

  await browser.close()
  console.log(`Close the browser`)
}
