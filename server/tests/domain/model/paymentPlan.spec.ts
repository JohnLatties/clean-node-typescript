import { PaymentPlan } from '../../../src/domain/models/refinancingProposal/PaymentPlan'
import { InvalidPaymentPlan } from '../../../src/domain/share/errors/InvalidPaymentPlan'
import { fail } from '../../../src/crosscutting/either'

describe('PaymentPlan', () => {
  test('Should not create PaymentPlan with invalida value', () => {
    const value = -550
    const months = 36

    const paymentPlanOrError = PaymentPlan.create({ value, months })

    expect(paymentPlanOrError).toEqual(fail(new InvalidPaymentPlan(value, months)))
  })

  test('Should not create PaymentPlan with invalida months', () => {
    const value = 340
    const months = 0

    const paymentPlanOrError = PaymentPlan.create({ value, months })

    expect(paymentPlanOrError).toEqual(fail(new InvalidPaymentPlan(value, months)))
  })

  test('Should create paymentPlan when all correct data', () => {
    const value = 340
    const months = 36

    const paymentPlanOrError = PaymentPlan.create({ value, months })
    const paymentPlan = paymentPlanOrError.value as PaymentPlan
    expect(paymentPlan.months).toBe(months)
    expect(paymentPlan.value).toBe(value)
  })
})
