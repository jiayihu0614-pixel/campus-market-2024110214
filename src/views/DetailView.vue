<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const itemId = computed(() => route.params.id ?? '未指定')
</script>

<template>
  <div class="page">
    <h1>详情页</h1>
    <p class="page-description">当前查看的信息编号：{{ itemId }}</p>
    <RouterLink class="back-link" to="/list">返回列表页</RouterLink>
  </div>
</template>

<style scoped>
.back-link {
  color: #146c50;
}
</style>
