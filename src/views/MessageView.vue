<template>
  <main class="page">
    <header class="page-header">
      <span class="page-tag">沟通与通知</span>
      <h1>消息中心</h1>
      <p>这里将展示私信会话、系统通知和信息互动消息。</p>
    </header>

    <section class="message-layout">
      <div class="skeleton-card">
        <h2>会话列表</h2>
        <p>后续展示联系人、最新消息、未读数量和消息时间。</p>
      </div>
      <div class="empty-panel">
        <div>
          <strong>选择一条会话</strong>
          <p>聊天记录和关联信息将在这里显示。</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.message-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
}

.empty-panel {
  min-height: 360px;
}
</style>
