import { RefinancingContractData } from './RefinancingContractData'

export interface IRefinancingContractRepository {
  findByKey: (key: string) => Promise<RefinancingContractData | null>
  add: (RefinancingProposals: RefinancingContractData) => Promise<void>
  update: (key: string, RefinancingProposals: RefinancingContractData) => Promise<void>
}