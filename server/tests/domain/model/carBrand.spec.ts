import { CarBrand } from '../../../src/domain/models/carBrand/carBrand'
import { fail } from '../../../src/crosscutting/either'
import { InvalidTextError } from '../../../src/domain/share/errors/InvalidTextError'
import { InvalidCarError } from '../../../src/domain/share/errors/InvalidCarError'

const failCarList = [
  { name: '', image: '', price: 0 }
]

const successCarList = [
  { name: 'new Car', image: 'image.png', price: 10000 }
]

describe('', () => {
  test('Should not create carBrand with invalida name', () => {
    const name = ''
    const image = 'imag.png'

    const carBrandOrError = CarBrand.create({ name, image, cars: successCarList })

    expect(carBrandOrError).toEqual(fail(new InvalidTextError(name, 'name')))
  })

  test('Should not create carBrand with invalida image', () => {
    const name = 'new car brand'
    const image = ''

    const carBrandOrError = CarBrand.create({ name, image, cars: successCarList })

    expect(carBrandOrError).toEqual(fail(new InvalidTextError(image, 'image')))
  })

  test('Should not create carBrand with invalida car list', () => {
    const name = 'new car brand'
    const image = 'image.png'

    const carBrandOrError = CarBrand.create({ name, image, cars: failCarList })

    expect(carBrandOrError).toEqual(fail(new InvalidCarError(0)))
  })

  test('Should not create carBrand when all correct data', () => {
    const name = 'new car brand'
    const image = 'image.png'

    const carBrandOrError = CarBrand.create({ name, image, cars: successCarList })

    const carBrand = carBrandOrError.value as CarBrand

    expect(carBrand.key).not.toBe(null)
    expect(carBrand.createdAt).not.toBe(null)
    expect(carBrand.name).toEqual(name)
    expect(carBrand.image).toEqual(image)
    expect(carBrand.cars.length).toEqual(1)
    expect(carBrand.cars[0].name).toEqual(successCarList[0].name)
    expect(carBrand.cars[0].image).toEqual(successCarList[0].image)
    expect(carBrand.cars[0].price).toEqual(successCarList[0].price)
  })
})
