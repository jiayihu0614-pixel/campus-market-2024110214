<template>
  <div class="app-shell">
    <header class="site-header">
      <div class="brand">校园轻集市</div>
      <nav class="main-nav" aria-label="主要导航">
        <RouterLink to="/home">首页</RouterLink>
        <RouterLink to="/list">列表页</RouterLink>
        <RouterLink to="/publish">发布页</RouterLink>
        <RouterLink to="/message">消息页</RouterLink>
        <RouterLink to="/profile">个人中心</RouterLink>
        <RouterLink to="/board">看板页</RouterLink>
      </nav>
    </header>

    <main class="page-container">
      <RouterView />
    </main>
  </div>
</template>

<style>
:root {
  color: #1f2937;
  background: #f5f7f6;
  font-family: "Microsoft YaHei", system-ui, sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button,
input,
textarea,
select {
  font: inherit;
}

.site-header {
  min-height: 64px;
  padding: 0 max(20px, calc((100% - 1080px) / 2));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  border-bottom: 1px solid #dce4df;
  background: #ffffff;
}

.brand {
  flex: none;
  color: #146c50;
  font-size: 19px;
  font-weight: 700;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
}

.main-nav a {
  padding: 9px 12px;
  border-radius: 5px;
  color: #4b5563;
  font-size: 14px;
  text-decoration: none;
  white-space: nowrap;
}

.main-nav a:hover,
.main-nav a.router-link-active {
  color: #146c50;
  background: #e8f3ee;
}

.page-container {
  width: min(1080px, calc(100% - 40px));
  margin: 0 auto;
  padding: 42px 0 64px;
}

.page {
  min-height: 320px;
}

.page h1 {
  margin: 0 0 16px;
  font-size: 30px;
  letter-spacing: 0;
}

.page-description {
  margin: 0 0 28px;
  color: #6b7280;
}

@media (max-width: 760px) {
  .site-header {
    padding: 14px 20px;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .main-nav {
    width: 100%;
  }

  .page-container {
    padding-top: 28px;
  }
}
</style>
