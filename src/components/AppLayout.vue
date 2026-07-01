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
  background: var(--color-page);
}

.app-main {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
  padding: 40px 0 76px;
}

@media (max-width: 720px) {
  .app-main {
    width: min(100% - 32px, 1200px);
    padding-top: 26px;
  }
}
</style>
