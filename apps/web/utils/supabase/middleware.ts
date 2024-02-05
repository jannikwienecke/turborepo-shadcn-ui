import { createServerClient, type CookieOptions } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

export const createClientForMiddleware = (
  request: NextRequest
): {
  supabase: SupabaseClient<Database>
  response: NextResponse
} => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  const supabase = createServerClient(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          request.cookies.set({
            name,
            value,
            ...options
          })
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          })
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          response.cookies.set({
            name,
            value,
            ...options
          })
        },
        remove(name: string, options: CookieOptions) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          request.cookies.set({
            name,
            value: "",
            ...options
          })
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          })
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          response.cookies.set({
            name,
            value: "",
            ...options
          })
        }
      }
    }
  )

  return { supabase, response }
}
