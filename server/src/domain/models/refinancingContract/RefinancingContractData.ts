import { paymentOptionsData, RefinancingProposalData } from '../refinancingProposal/RefinancingProposalData'

export interface RefinancingContractData {
  key: string
  proposal: RefinancingProposalData
  paymentPlan: paymentOptionsData
  createdAt: Date
  updatedAt: Date
  signed?: boolean
}
