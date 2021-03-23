import { DomainError } from './domainError'

export class InvalidCarBrandError extends Error implements DomainError {
  constructor (message: string) {
    super(`The car brand is invalid. ${message}`)
    this.name = 'InvalidCarBrandError'
  }
}
