import { IRefinancingContractRepository } from '@domain/models/refinancingContract/IRefinancingContractRepository'
import { RefinancingContractData } from '@domain/models/refinancingContract/RefinancingContractData'
import { MongoHelper } from './base'

function RefinancingContractRepository (): IRefinancingContractRepository {
  async function getCollection () {
    return (await MongoHelper.getCollection('refinancingContracts'))
  }
  return {
    add: async function (refinancingContractlData: RefinancingContractData): Promise<void> {
      const refinancingContractlCollection = await getCollection()
      await refinancingContractlCollection.insertOne({ ...refinancingContractlData })
    },
    update: async function (key: string, refinancingContractlData: RefinancingContractData): Promise<void> {
      const refinancingContractlCollection = await getCollection()
      await refinancingContractlCollection
        .findOneAndUpdate({ key },
          {
            $set: {
              signed: refinancingContractlData.signed,
              updatedAt: new Date()
            }
          })
    },
    findByKey: async function (key: string) {
      const refinancingContractlCollection = await getCollection()
      const result = await refinancingContractlCollection.findOne({ key })
      return result
    }
  }
}

export default RefinancingContractRepository
