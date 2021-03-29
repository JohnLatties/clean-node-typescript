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
    update: async function (key: string, refinancingContractlData: RefinancingProposalData): Promise<void> {
      const refinancingContractlCollection = await getCollection()
      await refinancingContractlCollection
        .findOneAndUpdate({ key },
          {
            $set: {
              contractKey: refinancingContractlData.contractKey,
              updatedAt: new Date()
            }
          })
    },
    findByKey: async function (key: string) {
      const refinancingProposaCollection = await getCollection()
      const result = await refinancingProposaCollection.findOne({ key })
      return result
    },
    delete: async function (key: string) {
      if (key) {
        const refinancingProposaCollection = await getCollection()
        await refinancingProposaCollection.deleteOne({ key })
      }
    }
  }
}

export default RefinancingProposalRepository
