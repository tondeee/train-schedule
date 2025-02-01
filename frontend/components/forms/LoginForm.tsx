'use client'

import { loginFormSchema } from '@/lib/validation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import Link from 'next/link'

type LoginFormSchema = z.infer<typeof loginFormSchema>

const LoginForm: React.FC = () => {
  const search = useSearchParams()

  const { register, handleSubmit, formState } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema)
  })

  const onSubmitHandler = handleSubmit((data) => {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: '/'
    })
  })

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        {search.has('error') && search.get('error') === 'CredentialsSignin' && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>Invalid email or password.</AlertDescription>
          </Alert>
        )}

        <form 
          method="post" 
          action="/api/auth/callback/credentials"
          onSubmit={onSubmitHandler}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">email</Label>
            <Input
              id="email"
              type="text"
              placeholder="Email address or email"
              {...register('email')}
              className={formState.errors.email ? 'border-destructive' : ''}
            />
            {formState.errors.email && (
              <p className="text-sm text-destructive">{formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              className={formState.errors.password ? 'border-destructive' : ''}
            />
            {formState.errors.password && (
              <p className="text-sm text-destructive">{formState.errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Button variant="link" className="px-0" asChild>
            <Link href="/register">Sign up</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  )
}

export default LoginForm
