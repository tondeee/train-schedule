import { redirect } from 'next/navigation'
import type { ToastActionElement } from '@/components/ui/toast'

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public shouldRedirect: boolean = false
  ) {
    super(message)
  }
}

export const handleError = (
  error: Error | AppError | unknown,
  showToast?: (props: {
    title: string;
    description: string;
    variant: "default" | "destructive";
    action?: ToastActionElement;
  }) => void
) => {
  if (error instanceof AppError) {
    if (showToast) {
      showToast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }

    if (error.shouldRedirect) {
      redirect('/')
    }
    return null
  }

  // Handle unknown errors
  console.error(error)
  if (showToast) {
    showToast({
      title: "Не вдалося виконати запит",
      description: "Щось пішло не так. Спробуйте ще раз.",
      variant: "destructive",
    })
  }

  return null
}
