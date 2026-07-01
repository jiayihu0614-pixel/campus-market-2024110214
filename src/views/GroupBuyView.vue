<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getGroupBuys } from '@/api/groupBuy'
import EmptyState from '@/components/EmptyState.vue'
import ItemCard from '@/components/ItemCard.vue'
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
const errorMessage = ref('')
const favoriteStore = useFavoriteStore()

onMounted(async () => {
  try {
    const response = await getGroupBuys()
    groupBuys.value = response.data
  } catch {
    errorMessage.value = '数据加载失败，请确认 JSON Server 已启动。'
  }
})
</script>

<template>
  <main class="page">
    <header class="page-header page-header--action">
      <div>
        <span class="page-tag">组队与拼单</span>
        <h1>拼单搭子</h1>
        <p>这里将展示拼餐、拼车、学习搭子和校园活动组队信息。</p>
      </div>
      <RouterLink class="page-action" to="/publish">发布信息</RouterLink>
    </header>

    <section v-if="groupBuys.length" class="data-list">
      <ItemCard
        v-for="item in groupBuys"
        :key="item.id"
        :title="item.title"
        :description="`${item.description} 当前人数：${item.currentCount}/${item.targetCount}`"
        :location="item.location"
        :time="`截止 ${item.deadline}`"
        :publisher="item.publisher"
        :status="item.status"
        :tag="item.type"
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
    <EmptyState v-else :text="errorMessage || '暂无拼单搭子信息'" />
  </main>
</template>
