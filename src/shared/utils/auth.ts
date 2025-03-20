import type { Client } from '@urql/vue'
import { consola } from 'consola'
import { type H3Event, setCookie } from 'h3'
import { decodeJwt } from 'jose'

import { useVioAuthStore } from '../../app/stores/auth'

export const getJwtFromCookie = () => {
  const cookie = useCookie(JWT_NAME())

  if (!cookie.value) {
    consola.debug('No token cookie.')
    return
  }

  const jwt = decodeJwt(cookie.value)

  if (jwt.exp === undefined || jwt.exp <= Date.now() / 1000) {
    consola.info('Token expired.')
    return
  }

  return {
    jwt: cookie.value,
    jwtDecoded: jwt,
  }
}

export const jwtStore = async ({
  $urqlReset,
  event,
  isInProduction,
  jwt,
  store,
}: {
  $urqlReset: () => Client
  event?: H3Event
  isInProduction: boolean
  jwt?: string
  store: ReturnType<typeof useVioAuthStore>
}) => {
  $urqlReset()

  consola.trace('Storing the following JWT: ' + jwt)
  store.jwtSet(jwt)

  if (event) {
    setCookie(event, JWT_NAME(), jwt || '', {
      expires: jwt ? new Date(Date.now() + 86400 * 1000 * 31) : new Date(0),
      httpOnly: true,
      path: '/',
      sameSite: 'lax', // Cannot be 'strict' to allow authentications after clicking on links within webmailers.
      secure: isInProduction,
    })
  } else {
    try {
      await $fetch('/api/auth', {
        method: 'POST',
        ...(jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : {}),
      })
    } catch (error) {
      console.error(error)
      return Promise.reject(Error('Authentication api call failed.'))
    }
  }
}

export const useJwtStore = () => {
  const { $urqlReset, ssrContext } = useNuxtApp()
  const store = useVioAuthStore()
  const runtimeConfig = useRuntimeConfig()

  return {
    async jwtStore(jwt?: string) {
      await jwtStore({
        $urqlReset: $urqlReset as () => Client,
        event: ssrContext?.event,
        isInProduction: runtimeConfig.public.vio.isInProduction,
        jwt,
        store,
      })
    },
  }
}

export const signOut = async ({
  $urqlReset,
  // client,
  event,
  isInProduction,
  store,
}: {
  $urqlReset: () => Client
  client: Client
  event?: H3Event
  isInProduction: boolean
  store: ReturnType<typeof useVioAuthStore>
}) => {
  await jwtStore({ $urqlReset, event, isInProduction, store })
  // await authenticationAnonymous({
  //   $urqlReset,
  //   client,
  //   event,
  //   isInProduction,
  //   store,
  // })
}

export const useSignOut = () => {
  const { $urql, $urqlReset, ssrContext } = useNuxtApp()
  const store = useVioAuthStore()
  const runtimeConfig = useRuntimeConfig()

  return {
    async signOut() {
      await signOut({
        $urqlReset: $urqlReset as () => Client,
        client: ($urql as Ref<Client>).value,
        event: ssrContext?.event,
        isInProduction: runtimeConfig.public.vio.isInProduction,
        store,
      })
    },
  }
}
