import { DomainError } from './domainError'

export class InvalidCarError extends Error implements DomainError {
  constructor (position: number) {
    super(`The car position "${position}" is invalid.`)
    this.name = 'InvalidCarError'
  }
}
