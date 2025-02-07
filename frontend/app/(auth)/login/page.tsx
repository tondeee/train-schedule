import LoginForm from '@/components/forms/LoginForm'
import type { Metadata } from 'next'
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Login - Turbo'
}

const Login = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm/>
    </Suspense>
  )
}

export default Login
