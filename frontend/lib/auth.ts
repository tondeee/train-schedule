import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getApiClient } from './api'
import { ApiError } from '@/packages/types/api'

const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (!token) return session

      session.user = {
        id: token.user.id,
        email: token.user.email,
        firstName: token.user.firstName,
        lastName: token.user.lastName,
        role: token.user.role
      }
      session.token = token.token
      session.refreshToken = token.refreshToken
      session.expires = token.tokenExpires.toString()

    
      return session
    },
    jwt: async ({ token, user }) => {
    
      if (user) {
        const tokenData = decodeToken(user.token)
        console.log('User token data:', tokenData);
        token.user = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
        token.token = user.token
        token.refreshToken = user.refreshToken
        token.tokenExpires = tokenData?.exp || 0
        return token
      }

      if (token.tokenExpires && Date.now() < token.tokenExpires * 1000) {
        return token
      }

  
      try {
      
        const apiClient = await getApiClient(undefined, { Authorization: `Bearer ${token.refreshToken}` });
        const response = await apiClient.auth.authControllerRefreshV1();
       
        return {
          ...token,
          token: response.token,
          refreshToken: response.refreshToken,
          tokenExpires: response.tokenExpires
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        return {
          ...token,
          error: 'RefreshTokenError'
        }
      }
    }
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing credentials')
          return null
        }

     
        try {
          const apiClient = await getApiClient()
          

          const requestPayload = {
            email: credentials.email,
            password: credentials.password
          }
         
          const response = await apiClient.auth.authControllerLoginV1(requestPayload)
     
          if (!response.token || !response.refreshToken) {
            console.error('Invalid response from server:', response)
            return null
          }

         
          const tokenData = decodeToken(response.token)
   

          return {
            id: response.user.id.toString(),
            email: response.user.email,
            firstName: response.user.firstName,
            lastName: response.user.lastName,
            role: response.user.role,
            token: response.token,
            refreshToken: response.refreshToken,
            tokenExpires: tokenData?.exp || 0
          }
        } catch (error) {
          console.error('Error logging in:', error)
          if (error instanceof ApiError) {
            if (error.status === 401) {
              console.error('Invalid credentials:', error.message)
            } else {
              console.error('Authentication error:', error.message)
            }
          } else {
            console.error('Unexpected error:', error)
          }
          return null
        }
      }
    })
  ]
}

export { authOptions }
