import { sql } from '../database.utils'

export interface Customer {
  customerId: string|null,
  customerName: string,
  customerPhone: string,
  customerEmail: string,
  customerHash: string,
  customerActivationToken: string|null
  
}

export interface PartialCustomer {
  customerId: string|null,
  customerName: string,
  customerPhone: string,
  customerEmail: string,
}


export async function insertCustomer (customer: Customer): Promise<string> {
  const { customerName, customerPhone, customerEmail, customerHash, customerActivationToken } = customer
   await sql`INSERT INTO customer (customer_id, customer_name, customer_phone, customer_email, customer_hash, customer_activation_token) VALUES(gen_random_uuid(), ${customerName}, ${customerPhone}, ${customerEmail}, ${customerHash}, ${customerActivationToken})`
  return 'Customer successfully created'
}

export async function updateCustomer (customer: PartialCustomer): Promise<string> {
  const { customerName, customerPhone, customerEmail, customerId } = customer
  await sql`UPDATE customer SET customer_name = ${customerName}, customer_email = ${customerEmail}, customer_phone = ${customerPhone} WHERE customer_id = ${customerId}`
  return 'Customer updated successfully'
}

export async function selectPartialCustomerByCustomerId (customerId: string): Promise<PartialCustomer|null> {
  const result = await sql<Customer[]>`SELECT customer_id, customer_phone, customer_email, customer_name from customer WHERE customer_id = ${customerId}`
  return result?.length === 1 ? result[0] : null
}


export async function selectCustomerByCustomerEmail (customerEmail: string): Promise<Customer|null> {
  const result = await sql <Customer[]>`SELECT customer_id, customer_phone, customer_email, customer_hash, customer_name from customer WHERE customer_email = ${customerEmail}`
  return result?.length === 1 ? result[0] : null
}

export async function selectCustomerByCustomerActivationToken (customerActivationToken: string): Promise<Customer|null> {
  const result = await sql<Customer[]>`SELECT customer_id, customer_phone, customer_email, customer_name from customer WHERE customer_activation_token = ${customerActivationToken}`
  return result?.length === 1 ? result[0] : null
}