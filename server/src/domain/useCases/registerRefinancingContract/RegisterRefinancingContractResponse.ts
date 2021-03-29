import { Either } from '@crosscutting/either'
import { InvalidRefinancingContractError } from '@domain/share/errors/InvalidRefinancingContractError'
import { RefinancingContractCreated } from './model'

export type RegisterRefinancingContractResponse = Either<InvalidRefinancingContractError, RefinancingContractCreated>
