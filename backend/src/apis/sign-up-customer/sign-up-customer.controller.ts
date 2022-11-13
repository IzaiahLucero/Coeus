import { Request, Response } from 'express';
import Mailgun from "mailgun.js";
import formData from 'form-data'
import {setActivationToken, setHash} from '../../utils/auth.utils'
import { insertCustomer, Customer } from '../../utils/models/Customer'
import {Status} from "../../utils/interfaces/Status";


export async function signUpCustomerController (request: Request, response: Response): Promise<Response | undefined> {
  try {

    const mailGun = new Mailgun(formData)
    const mailGunClient = mailGun.client({username:'api', key:process.env.MAILGUN_API_KEY as string})
    const { customerName, customerPhone, customerEmail, customerPassword, customerPasswordConfirm } = request.body
    const customerHash = await setHash(customerPassword)
    const customerActivationToken = setActivationToken()
    const basePath: string = `${request.protocol}://${request.hostname}/${request.originalUrl}/activation/${customerActivationToken}`
    const message = `<h2>Welcome to Food Truck.</h2>
    <p>Please confirm your email address before continuing </p>
    <p><a href="${basePath}">${basePath}</a></p>
`
    const mailgunMessage = {
      from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN as string}>`,
      to: customerEmail,
      subject: 'One step closer to Sticky Head -- Account Activation',
      html: message
    }

    const customer: Customer = { customerId: null, customerName, customerPhone, customerEmail, customerHash, customerActivationToken }

    await insertCustomer(customer)
    await mailGunClient.messages.create(process.env.MAILGUN_DOMAIN as string, mailgunMessage)

    const status: Status = {
      status: 200,
      message: 'Profile successfully created please check your email.',
      data: null
    }

    return response.json(status)
  } catch (error: any) {
    const status: Status = {
      status: 500,
      message: error.message,
      data: null
    }

    return response.json(status)
  }
}