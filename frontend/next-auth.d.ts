import 'next-auth'
import type { User as ApiUser } from './packages/types/api/models/User'
import { Role } from './packages/types/api'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    role: Role
    token: string
    refreshToken: string
    tokenExpires: number
  }

  interface Session {
    token: string
    refreshToken: string
    user: {
      id: string
      email: string
      firstName: string
      lastName: string
      role: Role
    }
    expires: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string
    refreshToken: string
    tokenExpires: number
    user: {
      id: string
      email: string
      firstName: string
      lastName: string
      role: Role 
    }
    error?: string
  }
}
