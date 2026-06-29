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
    <strong>{{ text }}</strong>
  </div>
</template>

<style scoped>
.empty-state {
  min-height: 180px;
  padding: 32px;
  display: grid;
  place-items: center;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  color: #6b7280;
  background: #ffffff;
  text-align: center;
}
</style>
