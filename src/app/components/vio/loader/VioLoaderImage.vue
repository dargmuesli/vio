<template>
  <div :class="[aspect, classes]">
    <VioLoaderIndicatorPing v-if="isLoading" />
    <VioCardStateAlert v-if="isError">
      {{ t('error') }}
    </VioCardStateAlert>
    <img
      v-if="srcWhenLoaded"
      :alt="alt"
      :class="[aspect, classes]"
      :height="height"
      :src="srcWhenLoaded"
      :width="width"
    />
    <img :alt="alt" class="hidden" :height="height" :src="src" :width="width" />
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es'

const {
  alt,
  aspect,
  classes = undefined,
  height,
  src,
  width,
} = defineProps<{
  alt: string
  aspect: string
  classes?: string
  height: string
  src: string
  width: string
}>()

const { t } = useI18n()

// data
const img = ref<HTMLImageElement>()
const isError = ref(false)
const isLoading = ref(false)
const loadingId = Math.random()
const loadingIds = useState('loadingIds', () => [] as number[])
const srcWhenLoaded = ref<string | undefined>(src)

// methods
const loadOnClient = () => {
  loadingStartDebounced()

  img.value = new Image()
  img.value.onload = () => {
    loadingStop()
    srcWhenLoaded.value = img.value?.src
  }
  img.value.onerror = () => {
    loadingStop()
    isError.value = true
  }
  img.value.src = src
}
const loadingStart = () => {
  srcWhenLoaded.value = undefined
  isLoading.value = true
  loadingIds.value.push(loadingId)
}
const loadingStartDebounced = debounce(loadingStart, 100)
const loadingStop = () => {
  loadingStartDebounced.cancel()
  isLoading.value = false
  loadingIds.value.splice(loadingIds.value.indexOf(loadingId), 1)
}

// lifecycle
onMounted(loadOnClient)
</script>

<i18n lang="yaml">
de:
  error: Bild konnte nicht geladen werden!
en:
  error: Image could not be loaded!
</i18n>
