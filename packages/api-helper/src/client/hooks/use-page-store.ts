// eslint-disable-next-line
// @ts-ignore
import type { ServerFunction } from "@api-helper/server"
import type { _InternalState } from "../../types"

import type { PrimitiveAtom } from "jotai"
import { atom, useAtom } from "jotai"

import React from "react"
import type z from "zod"

const internalStateAtom = atom<_InternalState>({
  isSuccess: false,
  isError: false,
  loading: false,
  prevState: null
})

const BASE_STATE: _InternalState = {
  isSuccess: false,
  isError: false,
  loading: false,
  prevState: null
}

// type ServerFunction<T extends z.ZodType<any, any>> = (cbProps: {
//   props: z.infer<T>
// }) => Promise<ServerActionResponse>

export const usePageAction = <
  StateType extends Record<string, any>,
  Key extends string,
  Fn extends ServerFunction<z.ZodType<any, any>>
>({
  stateAtom,
  action,
  key
}: {
  key: Key
  stateAtom: PrimitiveAtom<StateType>
  action: Fn
}) => {
  const [atomState, set] = useAtom(stateAtom)
  const [internal, setInternal] = useAtom(internalStateAtom)

  type ServerFunctionProps = Parameters<typeof action>[0]
  const propsRef = React.useRef<ServerFunctionProps | null>(null)
  const actionKeyRef = React.useRef<Key | null>(null)

  const execute = (
    props: ServerFunctionProps,
    cb: (state: StateType) => StateType
  ) => {
    setInternal({
      ...BASE_STATE,
      loading: true,
      prevState: atomState
    })

    set({
      ...cb(atomState)
    })

    propsRef.current = props
    actionKeyRef.current = key
  }

  React.useEffect(() => {
    const run = async () => {
      if (!propsRef.current) return
      if (!internal.loading) return

      const res = await action(propsRef.current)

      console.log("res:", res)
      propsRef.current = null

      if (res?.isError && res.error) {
        setInternal({
          ...BASE_STATE,
          isError: true,
          error: res.error
        })

        set({
          ...(internal.prevState as StateType)
        })
      } else if (res.isSuccess && res.success) {
        setInternal({
          ...BASE_STATE,
          isSuccess: true,
          success: res.success
        })
      } else {
        setInternal(BASE_STATE)
      }
    }

    run()
  }, [internal.loading])

  return {
    atomState,
    execute,
    isLoading: internal.loading,
    isError: internal.isError,
    isSuccess: internal.isSuccess,
    error: internal.error,
    success: internal.success
  }
}
