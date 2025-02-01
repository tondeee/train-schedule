'use server'

import { getApiClient } from '@/lib/api'
import type { registerFormSchema } from '@/lib/validation'
import { ApiError } from '@/packages/types/api'

import type { z } from 'zod'

export type RegisterFormSchema = z.infer<typeof registerFormSchema>

export type RegisterAction = (
  data: RegisterFormSchema
) => Promise<{ error?: string } | { success: true }>

const registerAction: RegisterAction = async (data) => {
  try {
    const apiClient = await getApiClient()
    console.log('Attempting registration with:', data) // Debug log

    const response = await apiClient.auth.authControllerRegisterV1({
      email: data.email,
      password: data.password,
      firstName: data.firstName || '', // Provide defaults
      lastName: data.lastName || '',
    })

    console.log('Registration response:', response) // Debug log
    return { success: true }
  } catch (error) {
    console.error('Registration error:', error) // Debug log
    if (error instanceof ApiError) {
      return { 
        error: error.body.message || 'Registration failed'
      }
    }
    return { error: 'An unexpected error occurred' }
  }
}

export { registerAction }
