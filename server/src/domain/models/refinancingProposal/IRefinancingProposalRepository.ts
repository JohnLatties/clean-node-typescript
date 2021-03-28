import { RefinancingProposalData } from './RefinancingProposalData'

export interface IRefinancingProposalRepository {
  findByKey: (key: string) => Promise<RefinancingProposalData | null>
  add: (RefinancingProposals: RefinancingProposalData) => Promise<void>
}
