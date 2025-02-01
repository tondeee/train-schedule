'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { ProfileAction } from '@/actions/profileAction'
import { fieldApiError } from '@/lib/forms'
import { profileFormSchema } from '@/lib/validation'
import type { UserCurrent } from '@frontend/types/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

export type ProfileFormSchema = z.infer<typeof profileFormSchema>

type ProfileFormProps = {
  currentUser: Promise<UserCurrent>
  onSubmitHandler: ProfileAction
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  currentUser,
  onSubmitHandler
}) => {
  const [success, setSuccess] = useState<boolean>(false)

  const { formState, handleSubmit, register, setError } =
    useForm<ProfileFormSchema>({
      resolver: zodResolver(profileFormSchema),
      defaultValues: async () => {
        const user = await currentUser

        return {
          firstName: user.first_name || '',
          lastName: user.last_name || ''
        }
      }
    })

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Profile Settings</CardTitle>
        <CardDescription>
          Update your account information
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert className="mb-4">
            <AlertDescription>Profile has been successfully updated</AlertDescription>
          </Alert>
        )}

        <form
          method="post"
          onSubmit={handleSubmit(async (data) => {
            const res = await onSubmitHandler(data)

            if (res !== true && typeof res !== 'boolean') {
              setSuccess(false)

              fieldApiError('first_name', 'firstName', res, setError)
              fieldApiError('last_name', 'lastName', res, setError)
            } else {
              setSuccess(true)
            }
          })}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              type="text"
              {...register('firstName')}
              className={formState.errors.firstName ? 'ring-2 ring-destructive' : ''}
            />
            {formState.errors.firstName && (
              <p className="text-sm font-medium text-destructive">{formState.errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              type="text"
              {...register('lastName')}
              className={formState.errors.lastName ? 'ring-2 ring-destructive' : ''}
            />
            {formState.errors.lastName && (
              <p className="text-sm font-medium text-destructive">{formState.errors.lastName.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Updating..." : "Update profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProfileForm
