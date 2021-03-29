import { Either, fail, success } from '@crosscutting/either'
import { Entity } from '@domain/share/entity'
import { InvalidPaymentPlan } from '@domain/share/errors/InvalidPaymentPlan'
import { InvalidRefinancingProposalError } from '@domain/share/errors/InvalidRefinancingProposalError'
import { PaymentPlanData } from '../refinancingProposal/paymenPlanData'
import { RefinancingProposal } from '../refinancingProposal/RefinancingProposal'
import { RefinancingProposalData } from '../refinancingProposal/RefinancingProposalData'

export class RefinancingContract extends Entity {
  public readonly proposal: RefinancingProposal
  public readonly paymentPlan: PaymentPlanData
  public readonly signed?: boolean

  private constructor (
    proposal: RefinancingProposal,
    paymentPlan: PaymentPlanData
  ) {
    super()
    this.proposal = proposal
    this.paymentPlan = paymentPlan
  }

  static create (proposal: RefinancingProposalData, paymentPlan: PaymentPlanData)
    : Either<InvalidRefinancingProposalError | InvalidPaymentPlan, RefinancingContract> {
    if (!proposal ||
      !proposal.key ||
      !proposal.proposalNumber ||
      !proposal.paymentOptions || !proposal.paymentOptions.length ||
      proposal.contractKey) {
      const { key, proposalNumber } = proposal || {}
      const errorMessage = `Invalid proposal key: ${key}, proposalNumbrer ${proposalNumber}`
      return fail(new InvalidRefinancingProposalError(errorMessage))
    }

    if (!paymentPlan || !paymentPlan.value || !paymentPlan.months) {
      return fail(new InvalidPaymentPlan(paymentPlan?.value, paymentPlan?.months))
    }

    const proposalOrError = RefinancingProposal.bindFrom(proposal)

    if (proposalOrError.Failed()) {
      return fail(new InvalidRefinancingProposalError(`Invalid proposal. ${proposalOrError.value.message}`))
    }

    const proposalEntity = proposalOrError.value

    return success(new RefinancingContract(proposalEntity, paymentPlan))
  }

  public sign () {
    Object.defineProperties(this, {
      signed: {
        value: true,
        writable: false
      }
    })
  }
}
