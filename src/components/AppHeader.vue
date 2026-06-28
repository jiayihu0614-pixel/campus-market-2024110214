<script setup lang="ts">
import AppNav from './AppNav.vue'
</script>

<template>
  <header class="app-header">
    <RouterLink class="brand" to="/">
      <span class="logo">校园轻集市</span>
      <span class="slogan">轻量、可信、面向校园生活</span>
    </RouterLink>

    <AppNav />
  </header>
</template>

<style scoped>
.app-header {
  min-height: 64px;
  padding: 0 max(24px, calc((100% - 1200px) / 2));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
}

.brand {
  display: flex;
  align-items: baseline;
  flex: none;
  gap: 12px;
  text-decoration: none;
}

.logo {
  color: #111827;
  font-size: 20px;
  font-weight: 700;
}

.slogan {
  color: #6b7280;
  font-size: 13px;
}

@media (max-width: 1050px) {
  .app-header {
    padding: 14px 24px;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .slogan {
    display: none;
  }
}
</style>
