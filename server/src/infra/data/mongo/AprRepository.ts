import { AprData } from '@domain/models/apr/AprData'
import { IAprRepository } from '@domain/models/apr/IAprRepository'
import { MongoHelper } from './base'

function AprRepository (): IAprRepository {
  async function getCollection () {
    return (await MongoHelper.getCollection('aprs'))
  }
  return {
    add: async function (aprData: AprData): Promise<void> {
      const aprCollection = await getCollection()
      await aprCollection.insertOne({ ...aprData })
    },
    findLast: async function () {
      const aprCollection = await getCollection()
      return (await aprCollection.find().sort({ createdAt: -1 }).next())
    }
  }
}

export default AprRepository
