import config from '../../config'
import { CarBrand } from '../../models/CarBrand'
import { HttpClient } from './base'

export class CarBrandApi extends HttpClient {
  private static classInstance?: CarBrandApi

  public constructor () {
    super(config.BASE_URL)
  }

  public static getInstance () {
    if (!this.classInstance) {
      this.classInstance = new CarBrandApi()
    }

    return this.classInstance
  }

  public getAll = () => this.instance.get<CarBrand[]>('api/carbrands');

}