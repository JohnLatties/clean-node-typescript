import { Either } from '@crosscutting/either'
import { InvalidRefinancingProposalError } from '@domain/share/errors/InvalidRefinancingProposalError'
import { RefinancingProposalCreated } from './model'

export type RegisterRefinancingProposalResponse = Either<InvalidRefinancingProposalError, RefinancingProposalCreated>
