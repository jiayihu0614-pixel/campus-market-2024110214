<template>
  <main class="page">
    <header class="page-header">
      <span class="page-tag">个人资料与内容管理</span>
      <h1>个人中心</h1>
      <p>这里将展示用户资料、我的发布、我的收藏和账号设置入口。</p>
    </header>

    <section class="user-summary">
      <div class="avatar" aria-hidden="true">校</div>
      <div>
        <h2>校园认证用户</h2>
        <p>学院、校区和个人信用信息将在这里展示。</p>
      </div>
    </section>

    <section class="card-grid">
      <article class="skeleton-card">
        <h2>我的发布</h2>
        <p>管理已发布、审核中和已完成的信息。</p>
      </article>
      <article class="skeleton-card">
        <h2>我的收藏</h2>
        <p>查看收藏的商品、拼单和校园互助信息。</p>
      </article>
      <article class="skeleton-card">
        <h2>账号设置</h2>
        <p>完善个人资料、校区信息和隐私设置。</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.user-summary {
  margin-bottom: 20px;
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
}

.avatar {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #ffffff;
  background: #2563eb;
  font-weight: 700;
}

.user-summary h2 {
  margin: 0 0 7px;
  font-size: 18px;
}

.user-summary p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}
</style>
