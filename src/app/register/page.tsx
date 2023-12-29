'use client'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import router from 'next/router'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, 'O usuário precisa ter pelo menos 3 letras.')
    .regex(/^([a-z\\-]+)$/i, 'O usuário só pode conter letras e hifens.')
    .toLowerCase(),
  name: z.string().min(3, 'O nome precisa ter pelo meso 3 letras'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const params = useSearchParams()

  const router = useRouter()

  useEffect(() => {
    const username = params.get('username')
    if (username) {
      setValue('username', username)
    }
  }, [params, setValue])

  const handleRegisterMutation = useMutation({
    mutationFn: async ({ name, username }: RegisterFormData) => {
      return await api.post('/users', {
        name,
        username,
      })
    },
    onSuccess() {
      router.push('/register/connect-calendar')
    },
    onError(err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        alert(err.response.data.message)
      }
    },
  })

  function handleRegister(data: RegisterFormData) {
    handleRegisterMutation.mutate(data)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep currentStep={1} size={4} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            {...register('username')}
            crossOrigin=""
            size="sm"
            prefix="ignite.com/"
            placeholder="seu-usuario"
          />
          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput
            {...register('name')}
            crossOrigin=""
            size="sm"
            placeholder="Seu nome"
          />
          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit" disabled={handleRegisterMutation.isLoading}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
