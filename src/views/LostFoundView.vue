<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getLostFounds } from '@/api/lostFound'
import EmptyState from '@/components/EmptyState.vue'
import ItemCard from '@/components/ItemCard.vue'
import { useFavoriteStore } from '@/stores/favorite'

interface LostFound {
  id: number
  title: string
  type: 'lost' | 'found'
  itemName: string
  location: string
  time: string
  contact: string
  description: string
  status: string
}

const lostFounds = ref<LostFound[]>([])
const errorMessage = ref('')
const favoriteStore = useFavoriteStore()

onMounted(async () => {
  try {
    const response = await getLostFounds()
    lostFounds.value = response.data
  } catch {
    errorMessage.value = '数据加载失败，请确认 JSON Server 已启动。'
  }
})
</script>

<template>
  <main class="page">
    <header class="page-header page-header--action">
      <div>
        <span class="page-tag">校园互助</span>
        <h1>失物招领</h1>
        <p>这里将展示同学发布的失物寻找和拾物招领信息。</p>
      </div>
      <RouterLink class="page-action" to="/publish">发布信息</RouterLink>
    </header>

    <section v-if="lostFounds.length" class="data-list">
      <ItemCard
        v-for="item in lostFounds"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :location="item.location"
        :time="item.time"
        :publisher="item.contact"
        :status="item.status"
        :tag="item.type === 'lost' ? `寻物：${item.itemName}` : `招领：${item.itemName}`"
      >
        <template #footer>
          <button
            class="favorite-button"
            :class="{ 'is-active': favoriteStore.isFavorite('lostFound', item.id) }"
            type="button"
            @click="
              favoriteStore.toggleFavorite({
                id: item.id,
                type: 'lostFound',
                title: item.title,
                description: item.description,
                location: item.location,
                time: item.time,
                publisher: item.contact,
                status: item.status,
                tag: item.type === 'lost' ? `寻物：${item.itemName}` : `招领：${item.itemName}`,
              })
            "
          >
            {{ favoriteStore.isFavorite('lostFound', item.id) ? '已收藏' : '收藏' }}
          </button>
        </template>
      </ItemCard>
    </section>
    <EmptyState v-else :text="errorMessage || '暂无失物招领信息'" />
  </main>
</template>
