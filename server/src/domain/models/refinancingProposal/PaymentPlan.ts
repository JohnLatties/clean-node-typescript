import { Either, success, fail } from '@crosscutting/either'
import { InvalidPaymentPlan } from '@domain/share/errors/InvalidPaymentPlan'
import { PaymentPlanData } from './paymenPlanData'

export class PaymentPlan {
  public readonly valeu: number
  public readonly months: number

  private constructor (valeu: number, months: number) {
    this.valeu = valeu
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
