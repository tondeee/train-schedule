import { ApiClient } from '@/packages/types/api'
import type { Session } from 'next-auth'

// Updated to accept additional headers
const getApiClient = async (session?: Session | null, additionalHeaders?: Record<string, string>) => {
  return new ApiClient({
    BASE: process.env.API_URL,
    HEADERS: {
      ...(session ? { Authorization: `Bearer ${session.token}` } : {}),
      ...additionalHeaders
    }
  })
}

export { getApiClient }
