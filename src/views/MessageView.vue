<template>
  <main class="page">
    <header class="page-header">
      <span class="page-tag">沟通与通知</span>
      <h1>消息中心</h1>
      <p>Day5暂不接入真实消息服务，这里展示与当前功能相关的基础提示。</p>
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
  gap: 14px;
}

.notice-card {
  padding: 20px 22px;
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr);
  align-items: start;
  gap: 18px;
  border: 1px solid #dfe5ee;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 5px 18px rgb(23 32 51 / 4%);
}

.notice-card h2,
.notice-card p {
  margin: 0;
}

.notice-card h2 {
  color: #172033;
  font-size: 17px;
}

.notice-card p {
  margin-top: 7px;
  color: #64748b;
  font-size: 14px;
  line-height: 1.7;
}

.notice-type {
  padding: 6px 9px;
  border-radius: 4px;
  color: #1d4ed8;
  background: #eff6ff;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

.notice-type.is-favorite {
  color: #be123c;
  background: #fff1f2;
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
