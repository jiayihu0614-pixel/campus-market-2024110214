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
  border: 1px dashed #b8c4d6;
  border-radius: 8px;
  color: #64748b;
  background: #ffffff;
  box-shadow: 0 5px 18px rgb(23 32 51 / 4%);
  text-align: center;
}
</style>
