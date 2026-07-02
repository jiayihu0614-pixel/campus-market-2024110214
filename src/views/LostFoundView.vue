<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { getLostFounds } from '@/api/lostFound'
import EmptyState from '@/components/EmptyState.vue'
import ErrorState from '@/components/ErrorState.vue'
import ItemCard from '@/components/ItemCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import SearchBar from '@/components/SearchBar.vue'
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
const keyword = ref('')
const loading = ref(false)
const loadFailed = ref(false)
const favoriteStore = useFavoriteStore()

const visibleItems = computed(() => {
  const searchText = keyword.value.trim().toLowerCase()
  const matched = searchText
    ? lostFounds.value.filter((item) =>
        [item.title, item.itemName, item.location, item.description, item.contact].some((value) =>
          value.toLowerCase().includes(searchText),
        ),
      )
    : lostFounds.value

  return matched
})

async function loadItems() {
  loading.value = true
  loadFailed.value = false
  try {
    const response = await getLostFounds()
    lostFounds.value = response.data
  } catch {
    loadFailed.value = true
  } finally {
    loading.value = false
  }
}

onMounted(loadItems)
</script>

<template>
  <main class="page">
    <header class="page-header page-header--action">
      <div>
        <span class="page-tag">校园互助</span>
        <h1>失物招领</h1>
        <p>按物品名称和丢失地点查找线索，核对特征后再与发布者联系领取。</p>
      </div>
      <RouterLink class="page-action" to="/publish">发布信息</RouterLink>
    </header>

    <SearchBar v-model="keyword" placeholder="搜索物品、丢失地点或联系人" />

    <LoadingState v-if="loading" text="正在加载失物招领信息..." />
    <ErrorState v-else-if="loadFailed" message="失物招领信息加载失败" @retry="loadItems" />
    <section v-else-if="visibleItems.length" class="data-list">
      <ItemCard
        v-for="item in visibleItems"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :location="item.location"
        :time="item.time"
        :publisher="item.contact"
        :status="item.status"
        :tag="item.type === 'lost' ? `寻物：${item.itemName}` : `招领：${item.itemName}`"
        :detail-to="`/detail/lostFound/${item.id}`"
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
    <EmptyState v-else :text="keyword ? '没有找到匹配的失物招领信息' : '暂无失物招领信息'" />
  </main>
</template>
