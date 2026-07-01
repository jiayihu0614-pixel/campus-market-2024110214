<template>
  <nav class="app-nav" aria-label="主要导航">
    <RouterLink to="/">首页</RouterLink>
    <RouterLink to="/trade">二手交易</RouterLink>
    <RouterLink to="/lost-found">失物招领</RouterLink>
    <RouterLink to="/group-buy">拼单搭子</RouterLink>
    <RouterLink to="/errand">跑腿委托</RouterLink>
    <RouterLink to="/publish">发布</RouterLink>
    <RouterLink to="/message">消息</RouterLink>
    <RouterLink to="/user">个人中心</RouterLink>
  </nav>
</template>

<style scoped>
.app-nav {
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: thin;
}

.app-nav a {
  padding: 9px 15px;
  border-radius: 999px;
  color: var(--color-body);
  font-size: 14px;
  text-decoration: none;
  white-space: nowrap;
}

.app-nav a:hover,
.app-nav a.router-link-active {
  color: var(--color-ink);
  background: var(--color-page);
  font-weight: 600;
}

.app-nav a.router-link-active {
  color: var(--color-primary-active);
  background: var(--color-primary-soft);
}

@media (max-width: 760px) {
  .app-nav {
    justify-content: flex-start;
    gap: 6px;
  }
}
</style>
