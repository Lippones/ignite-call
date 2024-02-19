import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { prisma } from '@/lib/prisma'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json(
      {},
      {
        status: 401,
      },
    )
  }

  const body = await req.json()

  try {
    const { bio } = updateProfileBodySchema.parse(body)

    console.log({
      bio,
      oi: session.user.id,
    })

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        bio,
      },
    })

    return Response.json({
      status: 204,
    })
  } catch (err) {
    if (err instanceof ZodError) {
      Response.json(
        {
          message: 'Validation failed',
          errors: fromZodError(err),
        },
        {
          status: 400,
        },
      )
    }

    throw err
  }
}
