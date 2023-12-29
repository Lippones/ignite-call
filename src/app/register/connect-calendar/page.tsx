'use client'
import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight } from 'phosphor-react'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function ConnectCalendar() {
  const session = useSession()
  const params = useSearchParams()

  const hasAuthError = !!params.get('error')

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados
        </Text>

        <MultiStep currentStep={2} size={4} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => signIn('google')}
          >
            Conectar <ArrowRight />
          </Button>
        </ConnectItem>

        {hasAuthError && (
          <AuthError>
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
