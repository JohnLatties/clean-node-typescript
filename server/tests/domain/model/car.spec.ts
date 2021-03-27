import { Car } from '../../../src/domain/models/carBrand/car'
import { fail } from '../../../src/crosscutting/either'
import { InvalidTextError } from '../../../src/domain/share/errors/InvalidTextError'

describe('Car entity', () => {
  test('Should not create car with invalida name', () => {
    const name = ''
    const image = 'imag.png'
    const price = 1000

    const carOrError = Car.create({ name, image, price })

    expect(carOrError).toEqual(fail(new InvalidTextError(name, 'name')))
  })

  test('Should not create car with invalida image', () => {
    const name = 'car name'
    const image = ''
    const price = 1000

    const carOrError = Car.create({ name, image, price })

    expect(carOrError).toEqual(fail(new InvalidTextError(image, 'image')))
  })

  test('Should create car when all correct data', () => {
    const name = 'a new car'
    const image = 'image.png'
    const price = 1000

    const carOrError = Car.create({ name, image, price })
    const car = carOrError.value as Car
    expect(car.key).not.toBe(null)
    expect(car.createdAt).not.toBe(null)
    expect(car.name).toEqual(name)
    expect(car.image).toEqual(image)
    expect(car.price).toEqual(price)
  })
})
