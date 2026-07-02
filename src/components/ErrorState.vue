<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
    showRetry?: boolean
  }>(),
  {
    message: '加载失败，请稍后重试',
    showRetry: true,
  },
)

defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="error-state" role="alert">
    <span class="error-icon" aria-hidden="true">!</span>
    <strong>内容暂时无法显示</strong>
    <p>{{ message }}</p>
    <button v-if="showRetry" type="button" @click="$emit('retry')">重新加载</button>
  </div>
</template>

<style scoped>
.error-state {
  min-height: 190px;
  padding: 28px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 8px;
  border: 1px solid var(--color-border-soft);
  border-radius: 18px;
  background: #ffffff;
  text-align: center;
}

.error-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--color-primary-active);
  background: var(--color-primary-soft);
  font-weight: 700;
}

.error-state strong { color: var(--color-ink); }
.error-state p { margin: 0; color: var(--color-muted); font-size: 14px; }
.error-state button {
  margin-top: 6px;
  padding: 9px 16px;
  border: 0;
  border-radius: 999px;
  color: #ffffff;
  background: var(--color-primary);
}
</style>
