import { IRefinancingContractRepository } from '@domain/models/refinancingContract/IRefinancingContractRepository'
import { RefinancingContractData } from '@domain/models/refinancingContract/RefinancingContractData'

function RefinancingContractRepository (): IRefinancingContractRepository {
  let _data: RefinancingContractData[] = []
  return {
    add: async function (refinancingContractlData: RefinancingContractData): Promise<void> {
      _data.push({ ...refinancingContractlData })
    },
    update: async function (key: string, refinancingContractlData: RefinancingContractData): Promise<void> {
      const found = await this.findByKey(key)
      if (found) {
        found.signed = refinancingContractlData.signed
        found.updatedAt = new Date()
        _data = [..._data.filter(item => item.key !== key), found]
      }
    },
    findByKey: async function (key: string) {
      const result = _data.find(item => item.key === key)
      return result || null
    }
  }
}

export default RefinancingContractRepository
