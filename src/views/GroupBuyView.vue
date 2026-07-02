<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { getGroupBuys } from '@/api/groupBuy'
import EmptyState from '@/components/EmptyState.vue'
import ErrorState from '@/components/ErrorState.vue'
import ItemCard from '@/components/ItemCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useFavoriteStore } from '@/stores/favorite'

interface GroupBuy {
  id: number
  title: string
  type: string
  targetCount: number
  currentCount: number
  deadline: string
  location: string
  publisher: string
  status: string
  description: string
}

const groupBuys = ref<GroupBuy[]>([])
const keyword = ref('')
const loading = ref(false)
const loadFailed = ref(false)
const favoriteStore = useFavoriteStore()

const visibleItems = computed(() => {
  const searchText = keyword.value.trim().toLowerCase()
  const matched = searchText
    ? groupBuys.value.filter((item) =>
        [item.title, item.type, item.location, item.description, item.publisher].some((value) =>
          value.toLowerCase().includes(searchText),
        ),
      )
    : groupBuys.value

  return matched
})

async function loadItems() {
  loading.value = true
  loadFailed.value = false
  try {
    const response = await getGroupBuys()
    groupBuys.value = response.data
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
        <span class="page-tag">组队与拼单</span>
        <h1>拼单搭子</h1>
        <p>找拼餐、拼车、学习和运动搭子，加入前请留意目标人数与截止时间。</p>
      </div>
      <RouterLink class="page-action" to="/publish">发布信息</RouterLink>
    </header>

    <SearchBar v-model="keyword" placeholder="搜索拼单主题、搭子类型或集合地点" />

    <LoadingState v-if="loading" text="正在加载拼单搭子信息..." />
    <ErrorState v-else-if="loadFailed" message="拼单搭子信息加载失败" @retry="loadItems" />
    <section v-else-if="visibleItems.length" class="data-list">
      <ItemCard
        v-for="item in visibleItems"
        :key="item.id"
        :title="item.title"
        :description="`${item.description} 当前人数：${item.currentCount}/${item.targetCount}`"
        :location="item.location"
        :time="`截止 ${item.deadline}`"
        :publisher="item.publisher"
        :status="item.status"
        :tag="item.type"
        :detail-to="`/detail/groupBuy/${item.id}`"
      >
        <template #footer>
          <button
            class="favorite-button"
            :class="{ 'is-active': favoriteStore.isFavorite('groupBuy', item.id) }"
            type="button"
            @click="
              favoriteStore.toggleFavorite({
                id: item.id,
                type: 'groupBuy',
                title: item.title,
                description: item.description,
                location: item.location,
                time: `截止 ${item.deadline}`,
                publisher: item.publisher,
                status: item.status,
                tag: item.type,
              })
            "
          >
            {{ favoriteStore.isFavorite('groupBuy', item.id) ? '已收藏' : '收藏' }}
          </button>
        </template>
      </ItemCard>
    </section>
    <EmptyState v-else :text="keyword ? '没有找到匹配的拼单搭子信息' : '暂无拼单搭子信息'" />
  </main>
</template>
