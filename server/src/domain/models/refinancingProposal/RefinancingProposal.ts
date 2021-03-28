import { Either, fail, success } from '@crosscutting/either'
import { InvalidCarError } from '@domain/share/errors/InvalidCarError'
import { InvalidCarBrandError } from '@domain/share/errors/InvalidCarBrandError'
import { InvalidAPRError } from '@domain/share/errors/InvalidAPRError'
import { PaymentPlan } from './PaymentPlan'
import { InvalidPaymentPlan } from '@domain/share/errors/InvalidPaymentPlan'
import { Entity } from '@domain/share/entity'
import { CarBradProposal } from './carBrandProposal'
import { CarProposal } from './carProposal'

export class RefinancingProposal extends Entity {
  public readonly proposalNumber: string
  public readonly carBrand: CarBradProposal
  public readonly car: CarProposal
  public readonly apr: number
  public readonly paymentOptions: PaymentPlan[]

  private constructor (
    proposalNumber: string,
    carBrand: CarBradProposal,
    car: CarProposal,
    apr: number,
    paymentOptions: PaymentPlan[]) {
    super()
    this.proposalNumber = proposalNumber
    this.carBrand = carBrand
    this.car = car
    this.apr = apr
    this.paymentOptions = paymentOptions
    Object.freeze(this)
  }

  static create (carBrand: CarBradProposal, car: CarProposal, apr: number):
    Either<InvalidCarError | InvalidCarBrandError | InvalidAPRError | InvalidPaymentPlan, RefinancingProposal> {
    if (!carBrand || !carBrand.key) {
      return fail(new InvalidCarBrandError('Missing car brand'))
    }

    if (!car || !car.key) {
      return fail(new InvalidCarError(0))
    }

    if (!apr) {
      return fail(new InvalidAPRError(apr))
    }

    const proposalNumber = `#${Date.now}`
    const paymentOptionsOrErros = this.calculatePaymentPlan(car, apr)

    const paymentOptionsError = paymentOptionsOrErros.find(item => item.Failed())
    if (paymentOptionsError) {
      return fail(paymentOptionsError.value as InvalidPaymentPlan)
    }

    const paymentOptions = paymentOptionsOrErros.map(item => item.value as PaymentPlan)
    return success(new RefinancingProposal(proposalNumber, carBrand, car, apr, paymentOptions))
  }

  private static calculatePaymentPlan (car: CarProposal, apr: number): Either<InvalidPaymentPlan, PaymentPlan>[] {
    const installments = [36, 48]
    const monthsOfYaer = 12
    const installmentCalculationOrError = installments.map(months => {
      const { price: carPrice } = car
      const totalValue = carPrice + (carPrice * (apr / 100) * (months / monthsOfYaer))
      const monthlyValue = Number((totalValue / months).toFixed(2))
      return PaymentPlan.create({ months, value: monthlyValue })
    })
    return installmentCalculationOrError.flatMap(item => item)
  }
}
