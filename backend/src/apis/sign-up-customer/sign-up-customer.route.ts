import { Router } from 'express'
import { signUpCustomerController } from './sign-up-customer.controller'
import { asyncValidatorController } from '../../utils/controllers/async-validator.controller'
import {checkSchema, param} from 'express-validator'
import { signUpCustomerValidator } from './sign-up-customer.validator'
import { activationCustomerController } from './activation-customer.controller'

export const signUpCustomerRoute = Router()

signUpCustomerRoute.route('/').post(asyncValidatorController(checkSchema(signUpCustomerValidator)), signUpCustomerController)

signUpCustomerRoute.route('/activation/:activation')
    .get(
        asyncValidatorController([param('activation', 'invalid activation link').isHexadecimal().notEmpty()]),
        activationCustomerController
    )