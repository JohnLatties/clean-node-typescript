import { IRefinancingProposalRepository } from '@domain/models/refinancingProposal/IRefinancingProposalRepository'
import { RefinancingProposalData } from '@domain/models/refinancingProposal/RefinancingProposalData'

function InMemoryRefinancingProposalRepository (): IRefinancingProposalRepository {
  const _data: RefinancingProposalData[] = []
  return {
    add: async function (refinancingProposalData: RefinancingProposalData): Promise<void> {
      _data.push({ ...refinancingProposalData })
    },
    findByKey: async function (key: string) {
      const result = _data.find(item => item.key === key)
      return result || null
    }
  }
}

export default InMemoryRefinancingProposalRepository
