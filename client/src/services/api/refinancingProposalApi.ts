import config from '../../config'
import { Proposal, ProposalCreated } from '../../models/Proposal'
import { HttpClient } from './base'

export class ProposalApi extends HttpClient {
  private static classInstance?: ProposalApi

  public constructor () {
    super(config.BASE_URL)
  }

  public static getInstance () {
    if (!this.classInstance) {
      this.classInstance = new ProposalApi()
    }

    return this.classInstance
  }

  public save = (carBrandKey: string, carKey: string) => this
    .instance
    .post<ProposalCreated>('api/proposals', {
      carBrandKey,
      carKey
    })


  public get = (key: string) => this.instance.get<Proposal>(`api/proposals/${key}`)

}