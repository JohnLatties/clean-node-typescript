import { Car } from './Cat'

export interface PaymentPlan {
  months: number
  value: number
}

export interface Proposal {
  number: string
  carBrand: {
    name: string,
    image: string
  }
  car: Car
  createdAt: Date
  apr: number
  paymentOptions: PaymentPlan[]
}