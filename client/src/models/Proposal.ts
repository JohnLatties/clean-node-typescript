import { Car } from './Car'

export interface PaymentPlan {
  months: number
  value: number
}

export interface Proposal {
  key: string
  proposalNumber: string
  carBrand: {
    key: string
    name: string,
    image: string
  }
  car: Car
  createdAt: Date
  updatedAt: Date
  apr: number
  paymentOptions: PaymentPlan[]
}

export interface ProposalCreated {
  key: string
}