import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { name, username } = await req.json()

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return Response.json(
      {
        message: 'username already exists',
      },
      {
        status: 400,
      },
    )
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  cookies().set({
    name: '@ignite-call:userId',
    value: user.id,
    maxAge: 60 * 60 * 24 * 7, // 7 days,
    path: '/',
  })

  return Response.json(
    { user },
    {
      status: 200,
    },
  )
}
