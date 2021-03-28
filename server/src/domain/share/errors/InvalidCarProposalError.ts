import { DomainError } from './domainError'

export class InvalidCarProposalError extends Error implements DomainError {
  constructor (message: string) {
    super(`The car is invalid. "${message}".`)
    this.name = 'InvalidCarProposalError'
  }
}
