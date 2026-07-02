<script setup lang="ts">
import AppLayout from './components/AppLayout.vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()
userStore.restoreLogin()
</script>

<template>
  <AppLayout />
</template>
