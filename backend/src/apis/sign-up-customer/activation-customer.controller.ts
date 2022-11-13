import { NextFunction, Request, Response } from 'express'
import { Customer, selectCustomerByCustomerActivationToken, updateCustomer } from '../../utils/models/Customer'
import { Status } from '../../utils/interfaces/Status'

export async function activationCustomerController (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
    try {
        const { activation } = request.params
        const customer = await selectCustomerByCustomerActivationToken(activation)
        console.log(customer)

        const activationFailed = (): Response => response.json({
            status: 400,
            data: null,
            message: 'Account activation has failed. Have you already activated this account'
        })

        const activationSucceeded = async (customer: Customer): Promise<Response> => {
            const updatedCustomer = { ...customer, customerActivationToken: null }
            console.log(updatedCustomer)
            await updateCustomer(updatedCustomer)
            return response.json({
                status: 200,
                data: null,
                message: 'Account activation was successful'
            })
        }

        return (customer != null) ? await activationSucceeded(customer) : activationFailed()
    } catch (error: any) {
        return response.json({ status: 500, data: null, message: error.message })
    }
}