/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { ContainerCalendar } from './container-calendar'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'

const getUserByUserName = unstable_cache(
  async (username: string) => {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        name: true,
        bio: true,
        avatar_url: true,
      },
    })

    return {
      user,
    }
  },
  ['user'],
  {
    revalidate: 60 * 60 * 24, // 1 day
  },
)

export default async function Schedule({
  params,
}: {
  params: {
    username: string
  }
}) {
  const { user } = await getUserByUserName(params.username)
  if (!user) {
    notFound()
  }
  return (
    <div>
      <ContainerCalendar user={user} />
    </div>
  )
}
