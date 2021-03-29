import { PaymentPlan, Proposal } from './Proposal'


export interface Contract {
  proposal: Proposal
  paymentPlan: PaymentPlan
  createdAt: Date
  signed: boolean
}

export interface ContractCreated {
  key: string
}