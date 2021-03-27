import { InvalidTextError } from '@domain/share/errors/InvalidTextError'
import { TextProp } from '@domain/share/valueObjects/text'
import { Either, fail, success } from '@crosscutting/either'
import { CarData } from './carData'
import { Entity } from '@domain/share/entity'

export class Car extends Entity {
  public readonly image: string
  public readonly name: string
  public readonly price: number

  private constructor (name: string, image: string, price: number) {
    super()
    this.name = name
    this.image = image
    this.price = price
    Object.freeze(this)
  }

  static create (carData: CarData): Either<InvalidTextError, Car> {
    const nameOrError: Either<InvalidTextError, TextProp> = TextProp.create(carData.name, 'name')
    const imageOrError: Either<InvalidTextError, TextProp> = TextProp.create(carData.image, 'image')

    if (nameOrError.Failed()) {
      return fail(nameOrError.value)
    }
    if (imageOrError.Failed()) {
      return fail(imageOrError.value)
    }
    const name: TextProp = nameOrError.value
    const image: TextProp = imageOrError.value
    return success(new Car(name.value, image.value, carData.price))
  }
}
