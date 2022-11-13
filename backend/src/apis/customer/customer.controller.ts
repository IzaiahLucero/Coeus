import { Request, Response } from 'express'
import { Customer, selectPartialCustomerByCustomerId, updateCustomer} from '../../utils/models/Customer'
import { Status } from '../../utils/interfaces/Status'

export async function putCustomerController (request: Request, response: Response): Promise<Response> {
  try {
    const { customerId } = request.params
    const customer = request.session.customer as Customer
    const customerIdFromSession = customer.customerId as string

    if (customerId !== customerIdFromSession) {
      return response.json({ status: 400, data: null, message: 'You are not allowed to perform this task' })
    }

    const { customerPhone, customerEmail, customerName } = request.body
    const updatedValues = { customerPhone, customerEmail, customerName }
    const previousCustomer: Customer = await selectPartialCustomerByCustomerId(customerId) as Customer

    const newCustomer: Customer = { ...previousCustomer, ...updatedValues }
    await updateCustomer(newCustomer)
    return response.json({ status: 200, data: null, message: 'Customer successfully updated' })
  } catch (error: any) {
    return response.json({ status: 400, data: null, message: error.message })
  }
}

export async function getCustomerByCustomerIdController (request: Request, response: Response): Promise<Response<Status>> {
  try {
    const { customerId } = request.params
    const mySqlResult = await selectPartialCustomerByCustomerId(customerId)
    const data = mySqlResult ?? null
    const status: Status = { status: 200, data, message: null }
    return response.json(status)
  } catch (error: any) {
    return (response.json({ status: 400, data: null, message: error.message }))
  }
}
