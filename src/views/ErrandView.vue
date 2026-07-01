<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getErrands } from '@/api/errand'
import EmptyState from '@/components/EmptyState.vue'
import ItemCard from '@/components/ItemCard.vue'
import { useFavoriteStore } from '@/stores/favorite'

interface Errand {
  id: number
  title: string
  taskType: string
  reward: number
  pickupLocation: string
  deliveryLocation: string
  deadline: string
  publisher: string
  status: string
  description: string
}

const errands = ref<Errand[]>([])
const errorMessage = ref('')
const favoriteStore = useFavoriteStore()

onMounted(async () => {
  try {
    const response = await getErrands()
    errands.value = response.data
  } catch {
    errorMessage.value = '数据加载失败，请确认 JSON Server 已启动。'
  }
})
</script>

<template>
  <main class="page">
    <header class="page-header">
      <span class="page-tag">校园互助</span>
      <h1>跑腿委托</h1>
      <p>这里将展示校内取快递、代买物品和文件送达等委托任务。</p>
    </header>

    <section v-if="errands.length" class="data-list">
      <ItemCard
        v-for="item in errands"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :price="`酬劳 ¥${item.reward}`"
        :location="`${item.pickupLocation} → ${item.deliveryLocation}`"
        :time="`截止 ${item.deadline}`"
        :publisher="item.publisher"
        :status="item.status"
        :tag="item.taskType"
      >
        <template #footer>
          <button
            class="favorite-button"
            :class="{ 'is-active': favoriteStore.isFavorite('errand', item.id) }"
            type="button"
            @click="
              favoriteStore.toggleFavorite({
                id: item.id,
                type: 'errand',
                title: item.title,
                description: item.description,
                location: `${item.pickupLocation} → ${item.deliveryLocation}`,
              })
            "
          >
            {{ favoriteStore.isFavorite('errand', item.id) ? '已收藏' : '收藏' }}
          </button>
        </template>
      </ItemCard>
    </section>
    <EmptyState v-else :text="errorMessage || '暂无跑腿委托信息'" />
  </main>
</template>
