<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  description: string
  price?: string | number
  location: string
  time: string
  publisher: string
  status: string
  tag?: string
}>()

const statusText = computed(() => {
  const labels: Record<string, string> = {
    open: '进行中',
    closed: '已关闭',
    done: '已完成',
  }

  return labels[props.status] ?? props.status
})
</script>

<template>
  <article class="item-card">
    <div class="item-card__top">
      <span v-if="tag" class="item-card__tag">{{ tag }}</span>
      <span class="item-card__status" :class="`is-${status}`">{{ statusText }}</span>
    </div>

    <h2>{{ title }}</h2>
    <p class="item-card__description">{{ description }}</p>

    <p v-if="price !== undefined && price !== ''" class="item-card__price">
      {{ price }}
    </p>

    <dl class="item-card__meta">
      <div>
        <dt>地点</dt>
        <dd>{{ location }}</dd>
      </div>
      <div>
        <dt>时间</dt>
        <dd>{{ time }}</dd>
      </div>
      <div>
        <dt>发布人</dt>
        <dd>{{ publisher }}</dd>
      </div>
    </dl>
  </article>
</template>

<style scoped>
.item-card {
  min-width: 0;
  padding: 22px;
  border: 1px solid #dfe5ee;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 5px 18px rgb(23 32 51 / 4%);
}

.item-card:hover {
  border-color: #b7c7e2;
  box-shadow: 0 12px 30px rgb(23 32 51 / 8%);
  transform: translateY(-2px);
}

.item-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.item-card__tag,
.item-card__status {
  padding: 5px 9px;
  border-radius: 4px;
  font-size: 12px;
}

.item-card__tag {
  color: #1d4ed8;
  background: #eff6ff;
  font-weight: 600;
}

.item-card__status {
  position: relative;
  padding-left: 19px;
  color: #4b5563;
  background: #f3f4f6;
}

.item-card__status::before {
  position: absolute;
  top: 50%;
  left: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  content: '';
  transform: translateY(-50%);
}

.item-card__status.is-open {
  color: #047857;
  background: #ecfdf5;
}

.item-card__status.is-done {
  color: #1d4ed8;
  background: #eff6ff;
}

.item-card h2 {
  margin: 17px 0 9px;
  color: #172033;
  font-size: 18px;
  line-height: 1.45;
}

.item-card__description {
  min-height: 48px;
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.7;
}

.item-card__price {
  margin: 15px 0 0;
  color: #e11d48;
  font-size: 20px;
  font-weight: 700;
}

.item-card__meta {
  margin: 18px 0 0;
  padding-top: 14px;
  display: grid;
  gap: 8px;
  border-top: 1px solid #edf0f5;
}

.item-card__meta div {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  gap: 8px;
  font-size: 13px;
}

.item-card__meta dt {
  color: #94a3b8;
  font-weight: 500;
}

.item-card__meta dd {
  margin: 0;
  color: #475569;
  overflow-wrap: anywhere;
}
</style>
