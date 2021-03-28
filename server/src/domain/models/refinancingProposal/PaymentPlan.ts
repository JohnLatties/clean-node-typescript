import { Either, success, fail } from '@crosscutting/either'
import { InvalidPaymentPlan } from '@domain/share/errors/InvalidPaymentPlan'
import { PaymentPlanData } from './paymenPlanData'

export class PaymentPlan {
  public readonly value: number
  public readonly months: number

  private constructor (value: number, months: number) {
    this.value = value
    this.months = months

    Object.freeze(this)
  }

  static create (paymentPlanData: PaymentPlanData): Either<InvalidPaymentPlan, PaymentPlan> {
    const { value, months } = paymentPlanData

    if (!months || !value || value <= 0) {
      return fail(new InvalidPaymentPlan(value, months))
    }

    return success(new PaymentPlan(value, months))
  }
}
