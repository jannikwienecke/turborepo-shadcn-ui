import * as zod from "zod"

export type ServerActionSuccessData = {
  message: string
  data: any
}

export type ServerActionErrorData = {
  message: string
  isSchemaError: boolean
  details: any
}

export type ServerActionSuccessResponse = {
  isSuccess: boolean
  isError: boolean
  error?: never
  success: ServerActionSuccessData
}

export type ServerActionErrorResponse = {
  isSuccess: boolean
  isError: boolean
  error: ServerActionErrorData
  success?: never
}

export type ServerActionResponse =
  | ServerActionSuccessResponse
  | ServerActionErrorResponse

export type ServerActionType<T extends zod.ZodType<any, any>> = (
  actionProps: zod.infer<T>
) => Promise<ServerActionResponse>

type _InternalStateBase = {
  loading: boolean
  prevState: any | null
}

export type _InternalStateError = {
  error: ServerActionErrorData
  success?: never
  isSuccess: false
  isError: true
  loading: false
} & _InternalStateBase

export type _InternalStateSuccess = {
  success: ServerActionSuccessData
  error?: never
  isSuccess: true
  isError: false
  loading: false
}

export type _InternalStateInit = {
  error?: never
  success?: never
  isSuccess: false
  isError: false
  loading: false
} & _InternalStateBase

export type _InternalStateLoading = {
  error?: never
  success?: never
  isSuccess: false
  isError: false
  loading: true
} & _InternalStateBase

export type _InternalState =
  | _InternalStateError
  | _InternalStateSuccess
  | _InternalStateLoading
  | _InternalStateInit
