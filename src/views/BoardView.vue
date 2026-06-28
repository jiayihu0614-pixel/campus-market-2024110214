<script setup lang="ts">
const statistics = [
  { label: '在售商品', value: 26 },
  { label: '今日发布', value: 8 },
  { label: '未读消息', value: 3 },
  { label: '累计成交', value: 42 },
]
</script>

<template>
  <div class="page">
    <h1>看板页</h1>
    <p class="page-description">校园集市当前数据概览。</p>

    <div class="stat-grid">
      <article v-for="statistic in statistics" :key="statistic.label" class="stat-card">
        <span>{{ statistic.label }}</span>
        <strong>{{ statistic.value }}</strong>
      </article>
    </div>
  </div>
</template>

<style scoped>
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.stat-card {
  padding: 20px;
  border: 1px solid #dce4df;
  border-radius: 7px;
  background: #ffffff;
}

.stat-card span,
.stat-card strong {
  display: block;
}

.stat-card span {
  color: #6b7280;
  font-size: 14px;
}

.stat-card strong {
  margin-top: 10px;
  color: #146c50;
  font-size: 30px;
}

@media (max-width: 720px) {
  .stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
