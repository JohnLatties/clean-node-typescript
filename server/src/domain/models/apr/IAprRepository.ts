import { AprData } from './AprData'

export interface IAprRepository {
  findLast: () => Promise<AprData | null>
  add: (aprData: AprData) => Promise<void>
}
