interface CarScrapingModel {
  name: string
  image: string
  price: number
  detailsUrl: string
}

export interface CarBrandScrapingModel {
  title: string
  image: string
  cars: CarScrapingModel[]
  detailsUrl: string
}
