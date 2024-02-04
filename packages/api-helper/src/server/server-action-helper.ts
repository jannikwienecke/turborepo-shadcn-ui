import type {
  ServerActionSuccessData,
  ServerActionResponse,
  ServerActionErrorData
} from "../types"

import type zod from "zod"

export const createSuccessResponse = (
  props: ServerActionSuccessData
): ServerActionResponse => ({
  isSuccess: true,
  isError: false,
  success: props
})

export const createErrorResponse = (
  props: ServerActionErrorData
): ServerActionResponse => ({
  isSuccess: false,
  isError: true,
  error: props
})

export type ServerFunction<T extends zod.ZodType<any, any>> = (cbProps: {
  props: zod.infer<T>
}) => Promise<ServerActionResponse>

export const serverAction = <T extends zod.ZodType<any, any>>(props: {
  schema: T
  callback: ServerFunction<T>
}) => {
  return async (actionProps: zod.infer<typeof props.schema>) => {
    await waitFor(1000)

    console.log("serverAction", actionProps)

    const parseResult = props.schema.safeParse(actionProps)

    if (!parseResult.success) {
      return createErrorResponse({
        message: "Invalid input",
        isSchemaError: true,
        details: JSON.stringify(parseResult.error)
      })
    }

    const result = await props.callback({
      props: actionProps
    })

    return result
  }
}

const waitFor = async (ms: number) => {
  const promise = new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

  await promise
}
