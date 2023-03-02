<template>
  <div>
    {{ config.project.name }}
  </div>
</template>

<script setup>
const config = useAppConfig()
</script>
