<script setup lang="ts">
const items = [
  { id: 1, title: '二手高等数学教材', price: 18 },
  { id: 2, title: '宿舍小台灯', price: 25 },
  { id: 3, title: '校园自行车', price: 180 },
]
</script>

<template>
  <div class="page">
    <h1>列表页</h1>
    <p class="page-description">查看校园内最新发布的闲置信息。</p>

    <div class="item-list">
      <article v-for="item in items" :key="item.id" class="item-row">
        <div>
          <strong>{{ item.title }}</strong>
          <span>¥{{ item.price }}</span>
        </div>
        <RouterLink :to="`/detail/${item.id}`">查看详情</RouterLink>
      </article>
    </div>
  </div>
</template>

<style scoped>
.item-list {
  display: grid;
  gap: 12px;
}

.item-row {
  min-height: 72px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border: 1px solid #dce4df;
  border-radius: 7px;
  background: #ffffff;
}

.item-row strong,
.item-row span {
  display: block;
}

.item-row span {
  margin-top: 5px;
  color: #d9485f;
}

.item-row a {
  flex: none;
  color: #146c50;
  text-decoration: none;
}
</style>
