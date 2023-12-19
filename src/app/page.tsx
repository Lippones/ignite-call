'use client'
import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import previewImage from '../assets/app-preview.png'
import Image from 'next/image'
import { ClaimUsersnameForm } from '@/components/home/claim-usersname-form'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl" as="h1">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>

        <ClaimUsersnameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Preview"
        />
      </Preview>
    </Container>
  )
}
