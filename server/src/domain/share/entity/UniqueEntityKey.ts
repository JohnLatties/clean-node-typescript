import { uuid } from 'uuidv4'

export abstract class UniqueEntityKey {
  public readonly key: string
  constructor (key?: string) {
    this.key = key || uuid()
  }
}
