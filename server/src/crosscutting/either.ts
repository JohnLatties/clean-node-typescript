export type Either<L, A> = Fail<L, A> | Success<L, A>

export class Fail<L, A> {
  readonly value: L

  constructor (value: L) {
    this.value = value
  }

  Failed (): this is Fail<L, A> {
    return true
  }

  Fulfilled (): this is Success<L, A> {
    return false
  }
}

export class Success<L, A> {
  readonly value: A

  constructor (value: A) {
    this.value = value
  }

  Failed (): this is Fail<L, A> {
    return false
  }

  Fulfilled (): this is Success<L, A> {
    return true
  }
}

export const fail = <L, A> (l: L): Either<L, A> => {
  return new Fail<L, A>(l)
}

export const success = <L, A> (a: A): Either<L, A> => {
  return new Success<L, A>(a)
}
