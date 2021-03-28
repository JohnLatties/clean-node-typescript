import { RefinancingProposal } from '../../../src/domain/models/refinancingProposal/RefinancingProposal'
import { InvalidCarBrandError } from '../../../src/domain/share/errors/InvalidCarBrandError'
import { InvalidPaymentPlan } from '../../../src/domain/share/errors/InvalidPaymentPlan'
import { InvalidAPRError } from '../../../src/domain/share/errors/InvalidAPRError'
import { InvalidCarProposalError } from '../../../src/domain/share/errors/InvalidCarProposalError'
import { fail } from '../../../src/crosscutting/either'

const InvalidCarBrandProposal = {
  key: '',
  name: '',
  image: ''
}

const InvalidCarProposal = {
  key: '',
  name: '',
  image: '',
  price: 0
}

const InvalidPriceCarProposal = {
  key: 'fecfe64c-307c-4d20-9e57-7ebce9b8fe1d',
  name: 'Acura ILX 2019',
  image: 'image.png',
  price: 0
}

const CarBrandProposal = {
  key: 'key-car-brandacura',
  name: 'Acura',
  image: 'image.png'
}

const CarProposal = {
  key: 'fecfe64c-307c-4d20-9e57-7ebce9b8fe1d',
  name: 'Acura ILX 2019',
  image: 'image.png',
  price: 23416
}

describe('RefinancingProposal', () => {
  test('Should not create RefinancingProposal with invalida carBrand', () => {
    const apr = 10
    const refinancingProposalOrError = RefinancingProposal.create(InvalidCarBrandProposal, CarProposal, apr)
    expect(refinancingProposalOrError).toEqual(fail(new InvalidCarBrandError('Missing car brand')))
  })

  test('Should not create RefinancingProposal with invalida car', () => {
    const apr = 10
    const refinancingProposalOrError = RefinancingProposal.create(CarBrandProposal, InvalidCarProposal, apr)
    expect((refinancingProposalOrError.value as InvalidCarProposalError).message).toMatch(/Missing car./)
  })

  test('Should not create RefinancingProposal with invalida APR', () => {
    const apr = 0
    const refinancingProposalOrError = RefinancingProposal.create(CarBrandProposal, CarProposal, apr)
    expect(refinancingProposalOrError).toEqual(fail(new InvalidAPRError(apr)))
  })

  test('Should not create RefinancingProposal with invalida payment plan', () => {
    const apr = 10
    const refinancingProposalOrError = RefinancingProposal.create(CarBrandProposal, InvalidPriceCarProposal, apr)
    const resultError = refinancingProposalOrError.value as InvalidPaymentPlan
    expect(resultError.message).toMatch(/The payment, with value: 0 and months: 36 is invalid./)
    expect(resultError).toBeInstanceOf(InvalidPaymentPlan)
  })

  test('Should create RefinancingProposal when all correct data', () => {
    const apr = 10
    const refinancingProposalOrError = RefinancingProposal.create(CarBrandProposal, CarProposal, apr)
    const resutl = refinancingProposalOrError.value as RefinancingProposal

    expect(resutl.proposalNumber).not.toBe(null)
    expect(resutl.carBrand.key).toBe(CarBrandProposal.key)
    expect(resutl.carBrand.name).toBe(CarBrandProposal.name)
    expect(resutl.car.key).toBe(CarProposal.key)
    expect(resutl.car.name).toBe(CarProposal.name)
    expect(resutl.apr).toBe(apr)
    expect(resutl.paymentOptions.length).toBe(2)
    expect(resutl.paymentOptions)
      .toEqual(expect
        .arrayContaining([
          expect.objectContaining({ value: 845.58, months: 36 }),
          expect.objectContaining({ value: 682.97, months: 48 })
        ])
      )
  })
})
