<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { getTrades } from '@/api/trade'
import EmptyState from '@/components/EmptyState.vue'
import ErrorState from '@/components/ErrorState.vue'
import ItemCard from '@/components/ItemCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useFavoriteStore } from '@/stores/favorite'

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
const keyword = ref('')
const loading = ref(false)
const loadFailed = ref(false)
const favoriteStore = useFavoriteStore()

const filteredTrades = computed(() => {
  const searchText = keyword.value.trim().toLowerCase()
  if (!searchText) return trades.value

  return trades.value.filter((item) =>
    [item.title, item.category, item.location, item.description].some((value) =>
      value.toLowerCase().includes(searchText),
    ),
  )
})

async function loadTrades() {
  loading.value = true
  loadFailed.value = false
  try {
    const response = await getTrades()
    trades.value = response.data
  } catch {
    loadFailed.value = true
  } finally {
    loading.value = false
  }
}

onMounted(loadTrades)
</script>

<template>
  <main class="page">
    <header class="page-header page-header--action">
      <div>
        <span class="page-tag">校园闲置</span>
        <h1>二手交易</h1>
        <p>这里将展示校园内发布的教材、数码产品、生活用品和运动器材。</p>
      </div>
      <RouterLink class="page-action" to="/publish">发布信息</RouterLink>
    </header>

    <SearchBar v-model="keyword" placeholder="搜索二手商品、分类或交易地点" />

    <LoadingState v-if="loading" text="正在加载二手商品..." />
    <ErrorState
      v-else-if="loadFailed"
      message="请确认 JSON Server 已在 3001 端口启动"
      @retry="loadTrades"
    />
    <section v-else-if="filteredTrades.length" class="data-list">
      <ItemCard
        v-for="item in filteredTrades"
        :key="item.id"
        :title="item.title"
        :description="`${item.description} 成色：${item.condition}`"
        :price="`¥${item.price}`"
        :location="item.location"
        :time="item.publishTime"
        :publisher="item.publisher"
        :status="item.status"
        :tag="item.category"
      >
        <template #footer>
          <button
            class="favorite-button"
            :class="{ 'is-active': favoriteStore.isFavorite('trade', item.id) }"
            type="button"
            @click="
              favoriteStore.toggleFavorite({
                id: item.id,
                type: 'trade',
                title: item.title,
                description: item.description,
                location: item.location,
                time: item.publishTime,
                publisher: item.publisher,
                status: item.status,
                price: `¥${item.price}`,
                tag: item.category,
              })
            "
          >
            {{ favoriteStore.isFavorite('trade', item.id) ? '已收藏' : '收藏' }}
          </button>
        </template>
      </ItemCard>
    </section>
    <EmptyState v-else :text="keyword ? '没有找到匹配的二手信息' : '暂无二手交易信息'" />
  </main>
</template>
