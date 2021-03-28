import { CarBradProposal } from './carBrandProposal'
import { CarProposal } from './carProposal'

interface paymentOptionsData {
  value: number
  months: number
}

export interface RefinancingProposalData {
  key: string
  proposalNumber: string
  carBrand: CarBradProposal
  car: CarProposal
  apr: number
  paymentOptions: paymentOptionsData[]
}
