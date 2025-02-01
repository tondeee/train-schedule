import { z } from 'zod'

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const registerFormSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    passwordRetype: z.string().min(6, 'Password confirmation is required')
  })
  .refine((data) => data.password === data.passwordRetype, {
    message: 'Passwords must match',
    path: ['passwordRetype']
  })

const profileFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional()
})

const deleteAccountFormSchema = z
  .object({
    username: z.string().min(6),
    usernameCurrent: z.string().min(6).optional()
  })
  .passthrough()
  .refine((data) => data.username === data.usernameCurrent, {
    message: 'Username is not matching',
    path: ['username']
  })

const changePasswordFormSchema = z
  .object({
    password: z.string().min(8),
    passwordNew: z.string().min(8),
    passwordRetype: z.string().min(8)
  })
  .refine((data) => data.passwordNew !== data.password, {
    message: 'Both new and current passwords are same',
    path: ['passwordNew']
  })
  .refine((data) => data.passwordNew === data.passwordRetype, {
    message: 'Passwords are not matching',
    path: ['passwordRetype']
  })

export {
  changePasswordFormSchema,
  deleteAccountFormSchema,
  loginFormSchema,
  profileFormSchema,
  registerFormSchema
}
