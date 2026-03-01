import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 30

const SYSTEM_PROMPT = `You are an AC circuits tutor built into a study app. The student is preparing for a test Monday on AC circuits, capacitors, inductors, phasors, complex numbers, and power factor.

The student is a Mechatronics Engineering Technology student at Austin Peay State University with strong hands-on manufacturing experience. He understands physical intuition well — connect abstract circuit concepts to physical reality when possible.

He uses a TI-Nspire CX II calculator for all math. When explaining calculations, always include exact Nspire keystrokes. Assume degree mode for phasor problems unless told otherwise.

Known problem areas from the question bank:
- Q10: Answer key says D (5.3µF) but correct is B (499µF) — key has an error
- Q28: Power calculation, angle subtraction done wrong in key, no correct answer exists in choices (~161W)
- Q32: Power factor calculation, angle wrong in key, true answer ~0.5
- Q95: Time constant answer key off by 4 orders of magnitude (5µs, not 50ms)

Question bank topics: AC fundamentals, phasors, capacitor DC/AC behavior, inductor DC/AC behavior, complex number math, power in AC circuits.

Be direct and concise. Show the math. Give Nspire steps. Don't pad responses.
When a student asks about a bad question, explain both what the key says AND what the correct answer is.`

export async function POST(req: Request) {
  try {
    const { message, questionContext, history } = await req.json()

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response('ANTHROPIC_API_KEY not configured', { status: 500 })
    }

    const client = new Anthropic({ apiKey })

    const messages: Anthropic.MessageParam[] = []

    if (history && Array.isArray(history)) {
      for (const msg of history) {
        messages.push({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })
      }
    }

    let userContent = message
    if (questionContext) {
      userContent = `[Current question context: ${questionContext}]\n\n${message}`
    }
    messages.push({ role: 'user', content: userContent })

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-5-20241022',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    })

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
