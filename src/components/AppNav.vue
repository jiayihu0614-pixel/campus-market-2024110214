<script setup lang="ts">
import { useFavoriteStore } from '@/stores/favorite'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()
</script>

<template>
  <nav class="app-nav" aria-label="主要导航">
    <RouterLink to="/">首页</RouterLink>
    <RouterLink to="/trade">二手交易</RouterLink>
    <RouterLink to="/lost-found">失物招领</RouterLink>
    <RouterLink to="/group-buy">拼单搭子</RouterLink>
    <RouterLink to="/errand">跑腿委托</RouterLink>
    <RouterLink class="publish-link" to="/publish">发布</RouterLink>
    <RouterLink to="/message">消息</RouterLink>
    <RouterLink class="user-link" to="/user">
      <span class="user-avatar" aria-hidden="true">{{ userStore.displayName.slice(0, 1) }}</span>
      <span>{{ userStore.displayName }}</span>
      <span class="favorite-count">收藏 {{ favoriteStore.favoriteCount }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.app-nav {
  width: 100%;
  min-width: 0;
  max-width: 100%;
  display: flex;
  align-items: center;
  gap: 2px;
  overflow-x: auto;
  scrollbar-width: thin;
}

.app-nav a {
  padding: 10px 11px;
  border-radius: 6px;
  color: #475569;
  font-size: 14px;
  text-decoration: none;
  white-space: nowrap;
}

.app-nav a:hover,
.app-nav a.router-link-active {
  color: #1d4ed8;
  background: #eff6ff;
  font-weight: 600;
}

.app-nav a.publish-link {
  margin: 0 4px;
  color: #ffffff;
  background: #2563eb;
}

.app-nav a.publish-link:hover,
.app-nav a.publish-link.router-link-active {
  color: #ffffff;
  background: #1d4ed8;
  box-shadow: 0 6px 14px rgb(37 99 235 / 18%);
}

.app-nav a.user-link {
  margin-left: 4px;
  display: flex;
  align-items: center;
  gap: 7px;
  border: 1px solid #dfe5ee;
  background: #ffffff;
}

.user-avatar {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #ffffff;
  background: #0f766e;
  font-size: 12px;
  font-weight: 700;
}

.favorite-count {
  color: #64748b;
  font-size: 12px;
  font-weight: 400;
}
</style>
