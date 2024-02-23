'use client'
import { Avatar, Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from './styles'
import { ScheduleForm } from './schedule-form'

interface ContainerCalendarProps {
  user: {
    name: string
    bio: string | null
    avatar_url: string | null
  }
}

export function ContainerCalendar({ user }: ContainerCalendarProps) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatar_url || ''} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>

      <ScheduleForm />
    </Container>
  )
}
