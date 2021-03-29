
import { DomainError } from './domainError'

export class InvalidSignRefinancingContractError extends Error implements DomainError {
  constructor (message: string) {
    super(`Unable to sign the contract. ${message}`)
    this.name = 'InvalidSignRefinancingContractError'
  }
}
