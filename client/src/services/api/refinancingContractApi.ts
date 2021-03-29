import config from '../../config'
import { Contract, ContractCreated } from '../../models/Contract'
import { HttpClient } from './base'

export class ContractApi extends HttpClient {
  private static classInstance?: ContractApi

  public constructor () {
    super(config.BASE_URL)
  }

  public static getInstance () {
    if (!this.classInstance) {
      this.classInstance = new ContractApi()
    }

    return this.classInstance
  }

  public save = (proposalKey: string, paymentPlan: number) => this
    .instance
    .post<ContractCreated>('api/contracts', {
      proposalKey,
      paymentPlan
    })


  public get = (key: string) => this.instance.get<Contract>(`api/contracts/${key}`)

}