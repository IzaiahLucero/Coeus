import { Request, Response } from 'express'
import 'express-session'
import { v4 as uuid } from 'uuid'
import { generateJwt, validatePassword } from '../../utils/auth.utils'
import { Customer, selectCustomerByCustomerEmail } from '../../utils/models/Customer'

export async function signInCustomerController (request: Request, response: Response): Promise<Response> {
  try {
    const { customerEmail, customerPassword } = request.body
    const customer = await selectCustomerByCustomerEmail(customerEmail)

    return (customer !== null) && await validatePassword(customer.customerHash, customerPassword)
      ? signInSuccessful(request, response, customer)
      : signInFailed(response)
  } catch (error: any) {
    return response.json({ status: 500, data: null, message: error.message })
  }
}

function signInFailed (response: Response): Response {
  return response.json({ status: 400, message: 'Email or password is incorrect please try again.', data: null })
}

function signInSuccessful (request: Request, response: Response, customer: Customer): Response {
  const { customerId, customerName, customerEmail } = customer
  const signature: string = uuid()
  const authorization: string = generateJwt({
    customerId,
    customerName,
    customerEmail
  }, signature)

  request.session.customer = customer
  request.session.jwt = authorization
  request.session.signature = signature

  response.header({
    authorization
  })
  return response.json({ status: 200, message: 'Sign in successful', data: null })
}