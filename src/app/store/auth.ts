import { decodeJwt, type JWTPayload } from 'jose'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVioAuthStore = defineStore('vio-auth', () => {
  const jwt = ref<string>()
  const jwtDecoded = ref<JWTPayload>()
  const signedInUsername = ref<string>()

  const jwtRemove = () => jwtSet(undefined)

  const jwtSet = (jwtNew?: string) => {
    const jwtDecodedNew = jwtNew !== undefined ? decodeJwt(jwtNew) : undefined

    jwt.value = jwtNew
    jwtDecoded.value = jwtDecodedNew
    signedInUsername.value =
      jwtDecodedNew?.role === 'vio_account' &&
      jwtDecodedNew.exp !== undefined &&
      jwtDecodedNew.exp > Math.floor(Date.now() / 1000)
        ? (jwtDecodedNew.username as string | undefined)
        : undefined
  }

  return {
    jwt,
    jwtDecoded,
    signedInUsername,
    jwtRemove,
    jwtSet,
  }
})
