<template>
  <main class="page">
    <header class="page-header">
      <span class="page-tag">沟通与通知</span>
      <h1>消息中心</h1>
    </header>

    <section class="notice-list">
      <article class="notice-card">
        <span class="notice-type">系统通知</span>
        <div>
          <h2>欢迎使用校园轻集市</h2>
          <p>你可以浏览四类校园信息，并通过发布页面分享自己的需求。</p>
        </div>
      </article>
      <article class="notice-card">
        <span class="notice-type is-favorite">收藏提示</span>
        <div>
          <h2>收藏内容统一查看</h2>
          <p>在业务列表点击收藏后，可以前往个人中心查看或取消收藏。</p>
        </div>
      </article>
      <article class="notice-card">
        <span class="notice-type is-publish">发布提示</span>
        <div>
          <h2>查看我的发布</h2>
          <p>使用当前用户发布的信息，会自动出现在个人中心的“我的发布”区域。</p>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.notice-list {
  display: grid;
  gap: 16px;
}

.notice-card {
  padding: 22px 24px;
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr);
  align-items: start;
  gap: 18px;
  border: 1px solid var(--color-border-soft);
  border-radius: 16px;
  background: var(--color-card);
}

.notice-card:hover {
  border-color: var(--color-border);
  box-shadow: 0 8px 24px rgb(0 0 0 / 5%);
}

.notice-card h2,
.notice-card p {
  margin: 0;
}

.notice-card h2 {
  color: var(--color-ink);
  font-size: 17px;
  font-weight: 650;
}

.notice-card p {
  margin-top: 7px;
  color: var(--color-muted);
  font-size: 14px;
  line-height: 1.7;
}

.notice-type {
  padding: 7px 10px;
  border-radius: 999px;
  color: var(--color-primary-active);
  background: var(--color-primary-soft);
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

.notice-type.is-favorite {
  color: var(--color-primary-active);
  background: var(--color-primary-soft);
}

.notice-type.is-publish {
  color: #047857;
  background: #ecfdf5;
}

@media (max-width: 560px) {
  .notice-card {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .notice-type {
    width: max-content;
  }
}
</style>
