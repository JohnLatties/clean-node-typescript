import { PaymentPlan, Proposal } from './Proposal'


export interface Contract {
  proposal: Proposal
  playmentPlan: PaymentPlan
  createdAt: Date
  signed: boolean
}