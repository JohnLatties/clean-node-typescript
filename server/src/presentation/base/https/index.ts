import { ServerError } from '../errors/serverError'
import { UnauthorizedError } from '../errors/unauthorizedError'

export type HttpResponse = {
  statusCode: number
  body: any
}

export interface HttpRequest {
  body?: any
  params?: any
}

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack!)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
