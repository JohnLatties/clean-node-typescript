import { UniqueEntityKey } from './UniqueEntityKey'

export abstract class Entity extends UniqueEntityKey {
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor (key?: string) {
    super(key)
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
