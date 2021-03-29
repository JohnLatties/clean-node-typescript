import { RefinancingContractData } from './RefinancingContractData'

export interface IRefinancingContractRepository {
  findByKey: (key: string) => Promise<RefinancingContractData | null>
  findAllSigned: () => Promise<RefinancingContractData[]>
  add: (RefinancingProposals: RefinancingContractData) => Promise<void>
  delete: (key: string) => Promise<void>
  update: (key: string, RefinancingProposals: RefinancingContractData) => Promise<void>
}
