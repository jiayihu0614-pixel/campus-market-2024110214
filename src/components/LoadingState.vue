<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
  }>(),
  {
    text: '正在加载...',
  },
)
</script>

<template>
  <div class="loading-state" role="status" aria-live="polite">
    <span class="spinner" aria-hidden="true"></span>
    <span>{{ text }}</span>
  </div>
</template>

<style scoped>
.loading-state {
  min-height: 180px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 12px;
  color: var(--color-muted);
  font-size: 14px;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid var(--color-primary-soft);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
