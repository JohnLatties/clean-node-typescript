import puppeteer from 'puppeteer'

export interface BrowserScraping {
  startBrowser: () => Promise<puppeteer.Browser | undefined>
}

export const browser: BrowserScraping = {
  startBrowser: async function (): Promise<puppeteer.Browser | undefined> {
    let browser
    try {
      console.log('Opening the browser.....')
      browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true
      })
    } catch (error) {
      console.error('Could not create a browser instance => : ', error)
    }
    return browser
  }
}

export const sleep = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
