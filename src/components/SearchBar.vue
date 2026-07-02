<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
  }>(),
  {
    placeholder: '搜索标题、分类或地点',
  },
)

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="search-bar">
    <span aria-hidden="true">搜</span>
    <input
      :value="modelValue"
      type="search"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button v-if="modelValue" type="button" @click="$emit('update:modelValue', '')">清空</button>
  </div>
</template>

<style scoped>
.search-bar {
  margin-bottom: 22px;
  padding: 7px 8px 7px 16px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 6px 18px rgb(0 0 0 / 4%);
}

.search-bar > span { color: var(--color-primary); font-weight: 700; }
.search-bar input { min-width: 0; padding: 8px 0; border: 0; outline: 0; color: var(--color-ink); background: transparent; }
.search-bar button { padding: 8px 13px; border: 0; border-radius: 999px; color: var(--color-body); background: var(--color-page); }
</style>
