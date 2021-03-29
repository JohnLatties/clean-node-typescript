
import { DomainError } from './domainError'

export class InvalidRefinancingContractError extends Error implements DomainError {
  constructor (message: string) {
    super(`The refinancing contract is invalid. ${message}`)
    this.name = 'InvalidRefinancingProposalError'
  }
}
