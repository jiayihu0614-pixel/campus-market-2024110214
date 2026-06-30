<template>
  <nav class="app-nav" aria-label="主要导航">
    <RouterLink to="/">首页</RouterLink>
    <RouterLink to="/trade">二手交易</RouterLink>
    <RouterLink to="/lost-found">失物招领</RouterLink>
    <RouterLink to="/group-buy">拼单搭子</RouterLink>
    <RouterLink to="/errand">跑腿委托</RouterLink>
    <RouterLink class="publish-link" to="/publish">发布</RouterLink>
    <RouterLink to="/message">消息</RouterLink>
    <RouterLink to="/user">我的</RouterLink>
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
</style>
