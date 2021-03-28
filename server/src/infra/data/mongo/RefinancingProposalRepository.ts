import { IRefinancingProposalRepository } from '@domain/models/refinancingProposal/IRefinancingProposalRepository'
import { RefinancingProposalData } from '@domain/models/refinancingProposal/RefinancingProposalData'
import { MongoHelper } from './base'

function RefinancingProposalRepository (): IRefinancingProposalRepository {
  async function getCollection () {
    return (await MongoHelper.getCollection('refinancingProposals'))
  }
  return {
    add: async function (refinancingProposalData: RefinancingProposalData): Promise<void> {
      const refinancingProposaCollection = await getCollection()
      await refinancingProposaCollection.insertOne({ ...refinancingProposalData })
    },
    findByKey: async function (key: string) {
      const refinancingProposaCollection = await getCollection()
      const result = await refinancingProposaCollection.findOne({ key })
      return result
    }
  }
}

export default RefinancingProposalRepository
