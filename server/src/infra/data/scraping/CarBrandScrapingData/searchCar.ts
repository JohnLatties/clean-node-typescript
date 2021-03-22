import { Browser } from 'puppeteer'
import { sleep } from '../helper'

interface CarSearch {
  name: string
  pageUrl: string
  image: string
  year: string
  price: number
}

export async function searchCar (browser: Browser, brandUrl: string, attempt: number = 1): Promise<CarSearch[]> {
  console.log(`Brand page: ${brandUrl} attempt: ${attempt}`)
  let result: CarSearch[] = []
  const brandCarPage = await browser.newPage()
  try {
    await brandCarPage.goto(brandUrl)
    sleep(200)
    const carList: CarSearch[] = await brandCarPage.evaluate(() => {
      const PAGE_CAR_CARD_SELECTOR = '[role="gridcell"]'
      const LIMIT = 5
      return Array
        .from(document.querySelectorAll(PAGE_CAR_CARD_SELECTOR))
        .slice(0, LIMIT)
        .map(carCard => {
          const name = (carCard.querySelector('h4>span>span') as HTMLSpanElement).textContent!
          const year = (carCard.querySelector('p>span>span>span>a') as HTMLLinkElement).textContent!
          const pageUrl = (carCard.querySelector('p>span>span>span>a') as HTMLLinkElement).href!
          const image = (carCard.querySelector('img') as HTMLImageElement).src!
          const price = 0

          return {
            name, year, pageUrl, image, price
          }
        })
    })

    brandCarPage.close()

    result = await searchCarPrice(browser, carList)
  } catch (error) {
    brandCarPage.close()
    searchCar(browser, brandUrl, (attempt + 1))
  }
  return result
}

async function searchCarPrice (browser: Browser, carList: CarSearch[]): Promise<CarSearch[]> {
  const carWithPriceList: CarSearch[] = []
  for (const carItem of carList) {
    const price = await getCarPrice(browser, carItem)
    carWithPriceList.push({ ...carItem, price })
  }
  return carWithPriceList
}

async function getCarPrice (browser: Browser, car: CarSearch, attempt: number = 1): Promise<number> {
  console.log(`Car page: ${car.pageUrl} attempt: ${attempt}`)

  let carPrice = 0

  const carPage = await browser.newPage()
  try {
    const { pageUrl } = car

    await carPage.goto(pageUrl)
    sleep(800)

    carPrice = await carPage.evaluate(() => {
      const VALUE_DESCRIPTION_SELECTOR = '#comp-kdv8sveq>p>span>span>span>span'
      const text = (document.querySelector(VALUE_DESCRIPTION_SELECTOR) as HTMLSpanElement).textContent!
      const priceStart = (text.indexOf('$') + 1)
      const priceEnd = text.indexOf(', ')
      const price = Number(text.substring(priceStart, priceEnd).replace(',', ''))
      return price
    })
    carPage.close()
  } catch (error) {
    carPage.close()
    getCarPrice(browser, car, (attempt + 1))
  }
  return carPrice
}
