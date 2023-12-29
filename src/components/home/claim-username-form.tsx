import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const ClaimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, 'O usuário precisa ter pelo menos 3 letras.')
    .regex(/^([a-z\\-]+)$/i, 'O usuário só pode conter letras e hifens.')
    .toLowerCase(),
})

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername({ username }: ClaimUsernameFormData) {
    router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          crossOrigin=""
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
        />
        <Button disabled={isSubmitting} size="sm" type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}
