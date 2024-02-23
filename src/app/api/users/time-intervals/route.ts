import { getServerSession } from 'next-auth/next'
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth/auth-options'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export async function POST(req: Request) {
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
    const { intervals } = timeIntervalsBodySchema.parse(body)

    // FIXME: Usar postgres e usar create many
    await Promise.all(
      intervals.map(({ endTimeInMinutes, startTimeInMinutes, weekDay }) =>
        prisma.userTimeInterval.create({
          data: {
            week_day: weekDay,
            time_end_in_minutes: endTimeInMinutes,
            time_start_in_minutes: startTimeInMinutes,
            user_id: session.user.id,
          },
        }),
      ),
    )

    return Response.json(
      {},
      {
        status: 201,
      },
    )
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
