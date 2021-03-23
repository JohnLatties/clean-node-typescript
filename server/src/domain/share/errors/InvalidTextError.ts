import { DomainError } from './domainError'

export class InvalidTextError extends Error implements DomainError {
  constructor (value: string, prop: string) {
    super(`The ${prop} "${value}" is invalid.`)
    this.name = 'InvalidTextlError'
  }
}
