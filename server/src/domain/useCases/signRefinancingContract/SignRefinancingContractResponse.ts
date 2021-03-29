import { Either } from '@crosscutting/either'
import { InvalidSignRefinancingContractError } from '@domain/share/errors/InvalidSignRefinancingContractError'
import { SignRefinancingContractOutput } from './model'

export type SignRefinancingContractResponse = Either<InvalidSignRefinancingContractError, SignRefinancingContractOutput>
