<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getTrades } from '@/api/trade'
import EmptyState from '@/components/EmptyState.vue'
import ItemCard from '@/components/ItemCard.vue'

interface Trade {
  id: number
  title: string
  price: number
  category: string
  condition: string
  publisher: string
  publishTime: string
  location: string
  status: string
  description: string
}

const trades = ref<Trade[]>([])
const errorMessage = ref('')

onMounted(async () => {
  try {
    const response = await getTrades()
    trades.value = response.data
  } catch {
    errorMessage.value = '数据加载失败，请确认 JSON Server 已启动。'
  }
})
</script>

<template>
  <main class="page">
    <header class="page-header">
      <span class="page-tag">校园闲置</span>
      <h1>二手交易</h1>
      <p>这里将展示校园内发布的教材、数码产品、生活用品和运动器材。</p>
    </header>

    <section v-if="trades.length" class="data-list">
      <ItemCard
        v-for="item in trades"
        :key="item.id"
        :title="item.title"
        :description="`${item.description} 成色：${item.condition}`"
        :price="`¥${item.price}`"
        :location="item.location"
        :time="item.publishTime"
        :publisher="item.publisher"
        :status="item.status"
        :tag="item.category"
      />
    </section>
    <EmptyState v-else :text="errorMessage || '暂无二手交易信息'" />
  </main>
</template>
