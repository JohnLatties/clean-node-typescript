
import { DomainError } from './domainError'

export class InvalidRefinancingProposalError extends Error implements DomainError {
  constructor (message: string) {
    super(`The refinancing proposal is invalid. ${message}`)
    this.name = 'InvalidRefinancingProposalError'
  }
}
