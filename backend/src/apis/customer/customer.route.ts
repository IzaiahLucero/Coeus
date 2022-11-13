import { getCustomerByCustomerIdController, putCustomerController } from './customer.controller'
import { Router } from 'express'
import { check, checkSchema } from 'express-validator'
import { asyncValidatorController } from '../../utils/controllers/async-validator.controller'
import { isLoggedInController } from '../../utils/controllers/is-logged-in.controller'
import { customerValidator } from './customer.validator'

export const customerRoute: Router = Router()
customerRoute.route('/')
  .post(putCustomerController)

customerRoute.route('/:customerId')
  .get(
    asyncValidatorController([
      check('customerId', 'please provide a valid customerId').isUUID()
    ])
    , getCustomerByCustomerIdController
  )
  .put(isLoggedInController, asyncValidatorController(checkSchema(customerValidator)), putCustomerController)
