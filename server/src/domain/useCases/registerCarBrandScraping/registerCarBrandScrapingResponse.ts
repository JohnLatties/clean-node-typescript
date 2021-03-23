import { Either } from '@crosscutting/either'
import { InvalidCarBrandError } from '@domain/share/errors/InvalidCarBrandError'

export type RegisterCarBrandScrapingResponse = Either<InvalidCarBrandError, void>
