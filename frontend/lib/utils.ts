import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


import { getApiClient } from '@/lib/api'

export const createAction = async <T>(
    action: (api: Awaited<ReturnType<typeof getApiClient>>) => Promise<T>
): Promise<T | null> => {
  try {
    const api = await getApiClient()
    return await action(api)
  } catch (error) {
    console.error('API Error:', error)
    console.log('API Error:', error)
    return null
  }
}

export const formatTimeFromServer = (timeString: string | null): string => {
  if (!timeString) return ''
  
  // If it's a time string (HH:mm:ss), just take HH:mm
  if (timeString.includes(':')) {
    return timeString.substring(0, 5)
  }
  return ''
}

export const formatTimeToServer = (timeString: string): string => {
  // Just append :00 to maintain HH:mm:ss format
  return timeString ? `${timeString}:00` : ''
}

export const sanitizeDescription = (description: string): string => {
  return description?.trim() || ''
}


export const DAYS = [
  { label: 'Sunday', value: 1 },
  { label: 'Monday', value: 2 },
  { label: 'Tuesday', value: 4 },
  { label: 'Wednesday', value: 8 },
  { label: 'Thursday', value: 16 },
  { label: 'Friday', value: 32 },
  { label: 'Saturday', value: 64 }
]

export const bitmaskToDays = (bitmask: number) => {
  return DAYS.filter(day => (bitmask & day.value) !== 0).map(day => day.value)
}

export const daysToBitmask = (days: number[]) => {
  return days.reduce((mask, day) => mask | day, 0)
}

export const WEEKDAYS = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
  { value: "SUNDAY", label: "Sunday" },
]

export const formatDays = (days: string[]): string => {
  return days.map(day => 
    WEEKDAYS.find(wd => wd.value === day)?.label || day
  ).join(", ")
}
