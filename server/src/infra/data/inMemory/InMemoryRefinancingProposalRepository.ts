import { IRefinancingProposalRepository } from '@domain/models/refinancingProposal/IRefinancingProposalRepository'
import { RefinancingProposalData } from '@domain/models/refinancingProposal/RefinancingProposalData'

function InMemoryRefinancingProposalRepository (): IRefinancingProposalRepository {
  let _data: RefinancingProposalData[] = []
  return {
    add: async function (refinancingProposalData: RefinancingProposalData): Promise<void> {
      _data.push({ ...refinancingProposalData })
    },
    update: async function (key: string, refinancingProposalData: RefinancingProposalData) {
      const found = await this.findByKey(key)
      if (found) {
        found.contractKey = refinancingProposalData.contractKey
        found.updatedAt = new Date()
        _data = [..._data.filter(item => item.key !== key), found]
      }
    },
    findByKey: async function (key: string) {
      const result = _data.find(item => item.key === key)
      return result || null
    },
    delete: async function (key: string): Promise<void> {
      _data = _data.filter(item => item.key !== key)
    }
  }
}

export default InMemoryRefinancingProposalRepository
