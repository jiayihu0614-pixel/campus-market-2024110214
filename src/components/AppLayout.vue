<script setup lang="ts">
import AppHeader from './AppHeader.vue'
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: #f5f7fb;
}

.app-main {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
  padding: 32px 0 64px;
}
</style>
