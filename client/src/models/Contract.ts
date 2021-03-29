import { PaymentPlan, Proposal } from './Proposal'


export interface Contract {
  key: string
  proposal: Proposal
  paymentPlan: PaymentPlan
  createdAt: Date
  signed: boolean
}

export interface ContractCreated {
  key: string
}