import { Router } from 'express'

import { signInCustomerValidator } from './sign-in-customer.validator'
import { signInCustomerController } from './sign-in-customer.controller'
import { checkSchema } from 'express-validator'
import { asyncValidatorController } from '../../utils/controllers/async-validator.controller'

export const signInCustomerRoute: Router = Router()

signInCustomerRoute.route('/').post(asyncValidatorController(checkSchema(signInCustomerValidator)), signInCustomerController)
