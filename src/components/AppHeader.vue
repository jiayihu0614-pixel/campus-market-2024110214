<script setup lang="ts">
import AppNav from './AppNav.vue'
</script>

<template>
  <header class="app-header">
    <RouterLink class="brand" to="/">
      <span class="brand-mark" aria-hidden="true">校</span>
      <span class="brand-copy">
        <span class="logo">校园轻集市</span>
        <span class="slogan">轻量、可信、面向校园生活</span>
      </span>
    </RouterLink>

    <AppNav />
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  z-index: 20;
  top: 0;
  min-height: 72px;
  padding: 0 max(24px, calc((100% - 1200px) / 2));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  border-bottom: 1px solid #dfe5ee;
  background: rgb(255 255 255 / 96%);
  box-shadow: 0 2px 12px rgb(23 32 51 / 4%);
  backdrop-filter: blur(10px);
}

.brand {
  display: flex;
  align-items: center;
  flex: none;
  gap: 11px;
  text-decoration: none;
}

.brand-mark {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: #ffffff;
  background: #2563eb;
  box-shadow: 0 6px 14px rgb(37 99 235 / 20%);
  font-size: 17px;
  font-weight: 700;
}

.brand-copy {
  display: grid;
  gap: 2px;
}

.logo {
  color: #172033;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.2;
}

.slogan {
  color: #7b8799;
  font-size: 12px;
}

@media (max-width: 1050px) {
  .app-header {
    position: static;
    padding: 12px 24px;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
  }

  .slogan {
    display: none;
  }
}
</style>
