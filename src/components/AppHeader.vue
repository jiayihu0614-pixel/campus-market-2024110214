<script setup lang="ts">
import AppNav from './AppNav.vue'
import { useFavoriteStore } from '@/stores/favorite'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()
</script>

<template>
  <header class="app-header">
    <div class="header-main">
      <RouterLink class="brand" to="/">
        <span class="brand-mark" aria-hidden="true">校</span>
        <span class="brand-copy">
          <span class="logo">校园轻集市</span>
          <span class="slogan">轻量、可信、面向校园生活</span>
        </span>
      </RouterLink>

      <RouterLink class="user-summary-link" to="/user">
        <span class="user-avatar" aria-hidden="true">{{ userStore.displayName.slice(0, 1) }}</span>
        <span class="user-copy">
          <strong>{{ userStore.displayName }}</strong>
          <small>收藏 {{ favoriteStore.favoriteCount }}</small>
        </span>
      </RouterLink>
    </div>

    <div class="nav-shell">
      <AppNav />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  z-index: 20;
  top: 0;
  border-bottom: 1px solid var(--color-border-soft);
  background: rgb(255 255 255 / 97%);
  backdrop-filter: blur(10px);
}

.header-main,
.nav-shell {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
}

.header-main {
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.nav-shell {
  padding: 7px 0;
  border-top: 1px solid var(--color-border-soft);
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
}

.brand-mark {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: #ffffff;
  background: var(--color-primary);
  font-size: 16px;
  font-weight: 700;
}

.brand-copy,
.user-copy {
  display: grid;
}

.brand-copy {
  gap: 2px;
}

.logo {
  color: var(--color-ink);
  font-size: 19px;
  font-weight: 700;
  line-height: 1.2;
}

.slogan {
  color: var(--color-muted);
  font-size: 12px;
}

.user-summary-link {
  padding: 7px 13px 7px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: inherit;
  text-decoration: none;
}

.user-summary-link:hover {
  border-color: #c8c8c8;
  box-shadow: 0 4px 12px rgb(0 0 0 / 6%);
}

.user-avatar {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #ffffff;
  background: var(--color-primary);
  font-size: 13px;
  font-weight: 700;
}

.user-copy {
  gap: 1px;
}

.user-copy strong {
  color: var(--color-ink);
  font-size: 13px;
}

.user-copy small {
  color: var(--color-muted);
  font-size: 11px;
}

@media (max-width: 760px) {
  .app-header {
    position: static;
  }

  .header-main,
  .nav-shell {
    width: min(100% - 32px, 1200px);
  }

  .slogan {
    display: none;
  }
}
</style>
