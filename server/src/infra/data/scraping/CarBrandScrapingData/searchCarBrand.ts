import { CarBrandScrapingModel } from '@application/query/carBrandScrapingQuery/model'
import { Browser } from 'puppeteer'
import { sleep } from '../helper'
import { searchCar } from './searchCar'

interface CarBrandSearch {
  title: string
  pageUrl: string
  image: string
}

export async function searchCarBrand (browser: Browser, url: string): Promise<CarBrandScrapingModel[]> {
  const homePage = await browser.newPage()
  await homePage.goto(url)

  await sleep(500)

  const brands: CarBrandSearch[] = await homePage.evaluate(async () => {
    const PAGE_BRAND_CLASS_SELECTOR = '._2TxBB._3TiYw'
    return Array
      .from(document.querySelectorAll(PAGE_BRAND_CLASS_SELECTOR))
      .map(brandElement => {
        const title = (brandElement as HTMLDivElement).title
        const pageUrl = (brandElement.children[0] as HTMLLinkElement).href
        const imagePath = brandElement.querySelector('wix-image')!.getAttribute('data-src') || ''
        const image = imagePath.substring(0, imagePath.indexOf('.png') + 4) || ''
        return { title, pageUrl, image }
      })
  })

  await homePage.close()

  const brandsWithCar = await loadBrandsWithCars(browser, brands)
  return brandsWithCar
}

async function loadBrandsWithCars (browser: Browser, brandList: CarBrandSearch[]): Promise<CarBrandScrapingModel[]> {
  const brands: CarBrandScrapingModel[] = []
  for (const brandItem of brandList) {
    const { title, pageUrl, image } = brandItem
    const carList = await searchCar(browser, pageUrl)

    const cars = carList.map(carItem => {
      const { name, pageUrl, image, year, price } = carItem
      return {
        name: `${name} ${year}`,
        image,
        price,
        detailsUrl: pageUrl
      }
    })

    brands.push({ title, image, detailsUrl: pageUrl, cars })
  }
  return brands
}
