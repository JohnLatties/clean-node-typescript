import { DomainError } from './domainError'

export class InvalidPaymentPlan extends Error implements DomainError {
  constructor (value: number, months: number) {
    super(`The payment, with value: ${value} and months: ${months} is invalid.`)
    this.name = 'InvalidPaymentPlan'
  }
}
