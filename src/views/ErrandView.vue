<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { getErrands } from '@/api/errand'
import EmptyState from '@/components/EmptyState.vue'
import ErrorState from '@/components/ErrorState.vue'
import ItemCard from '@/components/ItemCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import SearchBar from '@/components/SearchBar.vue'
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
const keyword = ref('')
const loading = ref(false)
const loadFailed = ref(false)
const favoriteStore = useFavoriteStore()

const visibleItems = computed(() => {
  const searchText = keyword.value.trim().toLowerCase()
  const matched = searchText
    ? errands.value.filter((item) =>
        [item.title, item.taskType, item.pickupLocation, item.deliveryLocation, item.description].some(
          (value) => value.toLowerCase().includes(searchText),
        ),
      )
    : errands.value

  return matched
})

async function loadItems() {
  loading.value = true
  loadFailed.value = false
  try {
    const response = await getErrands()
    errands.value = response.data
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
        <h1>跑腿委托</h1>
        <p>发布或承接校内取快递、代买和文件送达任务，事先确认地点、时间与酬劳。</p>
      </div>
      <RouterLink class="page-action" to="/publish">发布信息</RouterLink>
    </header>

    <SearchBar v-model="keyword" placeholder="搜索任务、取件地点或送达地点" />

    <LoadingState v-if="loading" text="正在加载跑腿委托..." />
    <ErrorState v-else-if="loadFailed" message="跑腿委托信息加载失败" @retry="loadItems" />
    <section v-else-if="visibleItems.length" class="data-list">
      <ItemCard
        v-for="item in visibleItems"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :price="`酬劳 ¥${item.reward}`"
        :location="`${item.pickupLocation} → ${item.deliveryLocation}`"
        :time="`截止 ${item.deadline}`"
        :publisher="item.publisher"
        :status="item.status"
        :tag="item.taskType"
        :detail-to="`/detail/errand/${item.id}`"
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
                time: `截止 ${item.deadline}`,
                publisher: item.publisher,
                status: item.status,
                price: `酬劳 ¥${item.reward}`,
                tag: item.taskType,
              })
            "
          >
            {{ favoriteStore.isFavorite('errand', item.id) ? '已收藏' : '收藏' }}
          </button>
        </template>
      </ItemCard>
    </section>
    <EmptyState v-else :text="keyword ? '没有找到匹配的跑腿委托' : '暂无跑腿委托信息'" />
  </main>
</template>
