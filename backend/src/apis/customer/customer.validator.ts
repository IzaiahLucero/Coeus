import { Schema } from 'express-validator'

export const customerValidator: Schema = {
  customerPhone: {
    escape: true,
    trim: true,
    optional: {
      options: {
        nullable: true
      }
    },
    isLength: {
      errorMessage: 'Customer phone must be between one and thirty two characters',
      options: { min: 1, max: 32 }
    }
  },
  customerEmail: {
    isEmail: {
      errorMessage: 'Please provide a valid email'
    },
    // Uncomment the next line to sanitize email, but it removes +1 from testing email addresses.
    normalizeEmail: true,
    trim: true
  },
  customerName: {
    escape: true,
    trim: true,
    isLength: {
      errorMessage: 'Customer name must be between one and thirty two characters',
      options: { min: 1, max: 64 }
    }
  }
}
