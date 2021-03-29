import { Either, fail, success } from '@crosscutting/either'
import { Entity } from '@domain/share/entity'
import { InvalidPaymentPlan } from '@domain/share/errors/InvalidPaymentPlan'
import { InvalidRefinancingProposalError } from '@domain/share/errors/InvalidRefinancingProposalError'
import { PaymentPlanData } from '../refinancingProposal/paymenPlanData'
import { RefinancingProposal } from '../refinancingProposal/RefinancingProposal'
import { RefinancingProposalData } from '../refinancingProposal/RefinancingProposalData'
import { RefinancingContractData } from './RefinancingContractData'

export class RefinancingContract extends Entity {
  public readonly proposal: RefinancingProposal
  public readonly paymentPlan: PaymentPlanData
  public readonly signed?: boolean

  private constructor (
    proposal: RefinancingProposal,
    paymentPlan: PaymentPlanData,
    key?: string
  ) {
    super(key || '')
    this.proposal = proposal
    this.paymentPlan = paymentPlan
  }

  static create (proposal: RefinancingProposalData, paymentPlan: PaymentPlanData, key?: string)
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

    return success(new RefinancingContract(proposalEntity, paymentPlan, key))
  }

  static bindFrom (data: RefinancingContractData) {
    if (!data || !data.key || !(data as RefinancingContract).createdAt) {
      return fail(new Error('Invalid data'))
    }

    const bindOrError = this.create(data.proposal, data.paymentPlan, data.key)
    if (bindOrError.Failed()) {
      return fail(new Error(bindOrError.value.message))
    }

    return success(bindOrError.value)
  }

  public sign () {
    Object.defineProperties(this, {
      signed: {
        value: true,
        writable: true
      }
    })
  }
}
