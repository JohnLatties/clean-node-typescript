import { InvalidCarError } from '@domain/share/errors/InvalidCarError'
import { InvalidTextError } from '@domain/share/errors/InvalidTextError'
import { TextProp } from '@domain/share/valueObjects/text'
import { Either, fail, success } from '@crosscutting/either'
import { Car } from './car'
import { CarBrandData } from './carBrandData'
import { Entity } from '@domain/share/entity'

export class CarBrand extends Entity {
  public readonly name: string
  public readonly image: string
  public readonly cars: Car[]

  private constructor (name: string, image: string, cars: Car[]) {
    super()
    this.name = name
    this.image = image
    this.cars = cars
    Object.freeze(this)
  }

  static create (carBrandData: CarBrandData): Either<InvalidTextError | InvalidCarError, CarBrand> {
    const nameOrError: Either<InvalidTextError, TextProp> = TextProp.create(carBrandData.name, 'name')
    const imageOrError: Either<InvalidTextError, TextProp> = TextProp.create(carBrandData.image, 'image')

    const carsOrError = carBrandData.cars.map(catItem => {
      return Car.create(catItem)
    })

    const carErrorPosition = carsOrError.findIndex(item => item.Failed())

    if (carErrorPosition >= 0) {
      return fail(new InvalidCarError(carErrorPosition))
    }

    if (nameOrError.Failed()) {
      return fail(nameOrError.value)
    }
    if (imageOrError.Failed()) {
      return fail(imageOrError.value)
    }
    const name: TextProp = nameOrError.value
    const image: TextProp = imageOrError.value
    const cars: Car[] = carsOrError.map(item => item.value) as Car[]
    return success(new CarBrand(name.value, image.value, cars))
  }
}
