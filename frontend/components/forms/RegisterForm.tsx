'use client'

import Link from 'next/link'


import { registerFormSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RegisterAction, RegisterFormSchema } from '@/actions/registerAction'
import { fieldApiError } from '@/lib/forms'

const RegisterForm: React.FC<{
  onSubmitHandler: RegisterAction
}> = ({ onSubmitHandler }) => {
  const { formState, handleSubmit, register, setError } =
    useForm<RegisterFormSchema>({
      resolver: zodResolver(registerFormSchema)
    })

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Create account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          method="post" 
          onSubmit={handleSubmit(async (data) => {
            try {
              const res = await onSubmitHandler(data)
              if ('success' in res && res.success === true) {
                await signIn('credentials', {
                  email: data.email,
                  password: data.password,
                  callbackUrl: '/',
                  redirect: true
                })
              } else {
               
                const errorMessage =  'Registration failed'
                setError('root', { message: errorMessage })
              }
            } catch (error) {
              console.error('Form submission error:', error)
              setError('root', { message: 'An unexpected error occurred' })
            }
          })}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="First name"
              {...register('firstName')}
              className={formState.errors.firstName ? 'ring-2 ring-destructive' : ''}
            />
            {formState.errors.firstName && (
              <p className="text-sm font-medium text-destructive">{formState.errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Last name"
              {...register('lastName')}
              className={formState.errors.lastName ? 'ring-2 ring-destructive' : ''}
            />
            {formState.errors.lastName && (
              <p className="text-sm font-medium text-destructive">{formState.errors.lastName.message}</p>
            )}
          </div>

          {/* Display root error if any */}
          {formState.errors.root && (
            <p className="text-sm font-medium text-destructive">{formState.errors.root.message}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">email</Label>
            <Input
              id="email"
              type="text"
              placeholder="Unique email"
              {...register('email')}
              className={formState.errors.email ? 'ring-2 ring-destructive' : ''}
            />
            {formState.errors.email && (
              <p className="text-sm font-medium text-destructive">{formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your new password"
              {...register('password')}
              className={formState.errors.password ? 'ring-2 ring-destructive' : ''}
            />
            {formState.errors.password && (
              <p className="text-sm font-medium text-destructive">{formState.errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="passwordRetype">Confirm Password</Label>
            <Input
              id="passwordRetype"
              type="password"  
              placeholder="Verify password"
              {...register('passwordRetype')}
              className={formState.errors.passwordRetype ? 'ring-2 ring-destructive' : ''}
            />
            {formState.errors.passwordRetype && (
              <p className="text-sm font-medium text-destructive">{formState.errors.passwordRetype.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-4">
        
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" className="px-0 h-auto" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  )
}

export default RegisterForm
