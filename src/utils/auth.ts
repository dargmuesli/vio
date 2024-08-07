import type { IncomingMessage, ServerResponse } from 'node:http'

import { consola } from 'consola'
import { parse, serialize } from 'cookie-es'
import { decodeJwt } from 'jose'
import type { Store } from 'pinia'

import { useVioAuthStore } from '../store/auth'
import { JWT_NAME } from './constants'

export const getJwtFromCookie = ({ req }: { req: IncomingMessage }) => {
  if (req.headers.cookie) {
    const cookies = parse(req.headers.cookie)

    if (cookies[JWT_NAME()]) {
      const cookie = decodeJwt(cookies[JWT_NAME()])

      if (cookie.exp !== undefined && cookie.exp > Date.now() / 1000) {
        return {
          jwt: cookies[JWT_NAME()],
          jwtDecoded: cookie,
        }
      } else {
        consola.info('Token expired.')
      }
    } else {
      consola.debug('No token cookie.')
    }
  } else {
    consola.debug('No cookie header.')
  }
}

export const jwtStore = async ({
  $urqlReset,
  store,
  res,
  jwt,
}: {
  $urqlReset: () => void
  store: Store
  res?: ServerResponse
  jwt?: string
}) => {
  $urqlReset()

  consola.trace('Storing the following JWT: ' + jwt)
  ;(store as unknown as { jwtSet: (jwtNew?: string) => void }).jwtSet(jwt)

  if (import.meta.server) {
    res?.setHeader(
      'Set-Cookie',
      serialize(JWT_NAME(), jwt || '', {
        expires: jwt ? new Date(Date.now() + 86400 * 1000 * 31) : new Date(0),
        httpOnly: true,
        path: '/',
        sameSite: 'lax', // Cannot be 'strict' to allow authentications after clicking on links within webmailers.
        secure: true,
      }),
    )
  } else {
    try {
      await $fetch('/api/auth', {
        method: 'POST',
        ...(jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : {}),
      })
    } catch (error: unknown) {
      console.error(error)
      return Promise.reject(Error('Authentication api call failed.'))
    }
  }
}

export const useJwtStore = () => {
  const { $urqlReset, ssrContext } = useNuxtApp()
  const store = useVioAuthStore()

  return {
    async jwtStore(jwt?: string) {
      await jwtStore({
        $urqlReset: $urqlReset as () => void,
        store,
        res: ssrContext ? ssrContext.event.node.res : undefined,
        jwt,
      })
    },
  }
}

export const signOut = async ({
  $urqlReset,
  store,
  res,
}: {
  $urqlReset: () => void
  store: Store
  res?: ServerResponse
}) => await jwtStore({ $urqlReset, store, res })

export const useSignOut = () => {
  const { $urqlReset, ssrContext } = useNuxtApp()
  const store = useVioAuthStore()

  if (typeof $urqlReset !== 'function')
    throw new Error('`$urqlReset` is not a function!')

  return {
    async signOut() {
      await signOut({
        $urqlReset: $urqlReset as () => void,
        store,
        res: ssrContext ? ssrContext.event.node.res : undefined,
      })
    },
  }
}
