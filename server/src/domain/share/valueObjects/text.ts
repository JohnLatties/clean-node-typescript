
import { Either, Fail, Success } from '@crosscutting/either'
import { InvalidTextError } from '../errors/InvalidTextError'

export class TextProp {
  private readonly name: string

  private constructor (name: string) {
    this.name = name
    Object.freeze(this)
  }

  static create (value: string, prop: string): Either<InvalidTextError, TextProp> {
    if (!TextProp.validate(value)) {
      return new Fail(new InvalidTextError(value, prop))
    }
    return new Success(new TextProp(value))
  }

  get value (): string {
    return this.name
  }

  static validate (value: string): boolean {
    if (!value || value.trim().length < 2 || value.trim().length > 255) {
      return false
    }
    return true
  }
}
