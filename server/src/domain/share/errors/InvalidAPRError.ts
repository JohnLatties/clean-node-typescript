import { DomainError } from './domainError'

export class InvalidAPRError extends Error implements DomainError {
  constructor (value: number) {
    super(`The APR "${value}" is invalid.`)
    this.name = 'InvalidAPRError'
  }
}
