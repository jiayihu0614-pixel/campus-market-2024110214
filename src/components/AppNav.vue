<template>
  <nav class="app-nav" aria-label="主要导航">
    <RouterLink to="/">首页</RouterLink>
    <RouterLink to="/trade">二手交易</RouterLink>
    <RouterLink to="/lost-found">失物招领</RouterLink>
    <RouterLink to="/group-buy">拼单搭子</RouterLink>
    <RouterLink to="/errand">跑腿委托</RouterLink>
    <RouterLink to="/publish">发布</RouterLink>
    <RouterLink to="/message">消息</RouterLink>
    <RouterLink to="/user">我的</RouterLink>
  </nav>
</template>

<style scoped>
.app-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
}

.app-nav a {
  padding: 9px 10px;
  border-radius: 5px;
  color: #4b5563;
  font-size: 14px;
  text-decoration: none;
  white-space: nowrap;
}

.app-nav a:hover,
.app-nav a.router-link-active {
  color: #2563eb;
  background: #eff6ff;
  font-weight: 600;
}
</style>
