<template>
  <div class="app-shell">
    <header class="site-header">
      <a class="brand" href="/" aria-label="校园轻集市首页">
        <span class="brand-mark">集</span>
        <span>校园轻集市</span>
      </a>
      <span class="campus">校内闲置 · 当面交易</span>
    </header>
    <RouterView />
  </div>
</template>

<style>
:root {
  color: #17201c;
  background: #f4f6f5;
  font-family: Inter, "Microsoft YaHei", system-ui, sans-serif;
  font-synthesis: none;
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
input {
  font: inherit;
}

.site-header {
  height: 64px;
  padding: 0 max(20px, calc((100% - 1120px) / 2));
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dfe5e1;
  background: #ffffff;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #17201c;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
}

.brand-mark {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  color: #ffffff;
  background: #087f5b;
  font-size: 16px;
}

.campus {
  color: #65726c;
  font-size: 13px;
}

@media (max-width: 560px) {
  .site-header {
    height: 58px;
  }

  .campus {
    display: none;
  }
}
</style>
