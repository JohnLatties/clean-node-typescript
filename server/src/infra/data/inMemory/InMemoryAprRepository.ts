import { AprData } from '@domain/models/apr/AprData'
import { IAprRepository } from '@domain/models/apr/IAprRepository'

function InMemoryAprRepository (): IAprRepository {
  const _aprs: AprData[] = []
  return {
    add: async function (aprData: AprData): Promise<void> {
      _aprs.push(aprData)
    },
    findLast: async function () {
      return _aprs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]
    }
  }
}

export default InMemoryAprRepository
