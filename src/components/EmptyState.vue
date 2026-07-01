<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
  }>(),
  {
    text: '暂无数据',
  },
)
</script>

<template>
  <div class="empty-state">
    <span class="empty-state__icon" aria-hidden="true">🧺</span>
    <strong>{{ text }}</strong>
  </div>
</template>

<style scoped>
.empty-state {
  min-height: 180px;
  padding: 40px 32px;
  display: grid;
  align-content: center;
  place-items: center;
  gap: 12px;
  border: 1px dashed var(--color-border);
  border-radius: 18px;
  color: var(--color-muted);
  background: var(--color-card);
  text-align: center;
}

.empty-state__icon {
  font-size: 30px;
  filter: grayscale(20%);
}

.empty-state strong {
  max-width: 420px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.7;
}
</style>
