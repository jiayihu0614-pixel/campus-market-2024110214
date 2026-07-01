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

    <footer v-if="$slots.footer" class="item-card__footer">
      <slot name="footer" />
    </footer>
  </article>
</template>

<style scoped>
.item-card {
  min-width: 0;
  padding: 22px 22px 18px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border-soft);
  border-radius: 16px;
  background: var(--color-card);
}

.item-card:hover {
  border-color: var(--color-border);
  box-shadow: 0 8px 24px rgb(0 0 0 / 6%);
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
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
}

.item-card__tag {
  color: var(--color-primary-active);
  background: var(--color-primary-soft);
  font-weight: 600;
}

.item-card__status {
  position: relative;
  padding-left: 19px;
  color: var(--color-muted);
  background: var(--color-page);
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
  color: var(--color-body);
  background: var(--color-page);
}

.item-card h2 {
  margin: 18px 0 9px;
  color: var(--color-ink);
  font-size: 18px;
  font-weight: 650;
  line-height: 1.45;
}

.item-card__description {
  min-height: 47px;
  margin: 0;
  display: -webkit-box;
  overflow: hidden;
  color: var(--color-muted);
  font-size: 14px;
  line-height: 1.7;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.item-card__price {
  margin: 15px 0 0;
  color: var(--color-primary-active);
  font-size: 20px;
  font-weight: 700;
}

.item-card__meta {
  margin: 18px 0 0;
  padding-top: 16px;
  display: grid;
  gap: 8px;
  border-top: 1px solid var(--color-border-soft);
}

.item-card__meta div {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  gap: 8px;
  font-size: 13px;
}

.item-card__meta dt {
  color: var(--color-muted-soft);
  font-weight: 500;
}

.item-card__meta dd {
  margin: 0;
  color: var(--color-body);
  overflow-wrap: anywhere;
}

.item-card__footer {
  margin-top: auto;
  padding-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
