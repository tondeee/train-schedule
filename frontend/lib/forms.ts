import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'

type ApiErrorResponse = {
  [key: string]: string | string[]
}

type ApiResponse = { success: true } | ApiErrorResponse

/**
 * Helper function processing error messages from API server
 *
 * Example API response (4xx status code):
 * {
 *   "first_name": "single error message"
 * }
 * or
 * {
 *   "first_name": [
 *     "first validation message",
 *     "second validation message"
 *   ]
 * }
 */
const fieldApiError = <TFieldValues extends FieldValues>(
  fieldName: string,
  fieldPath: Path<TFieldValues>,
  response: ApiResponse,
  setError: UseFormSetError<TFieldValues>
) => {
  if ('success' in response) {
    return
  }

  const errors = response[fieldName]
  if (typeof errors === 'string') {
    setError(fieldPath, { message: errors })
  } else if (Array.isArray(errors)) {
    for (const error of errors) {
      setError(fieldPath, { message: error })
    }
  }
}

export { fieldApiError, type ApiResponse }
