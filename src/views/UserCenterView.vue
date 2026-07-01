<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getErrands, type NewErrand } from '@/api/errand'
import { getGroupBuys, type NewGroupBuy } from '@/api/groupBuy'
import { getLostFounds, type NewLostFound } from '@/api/lostFound'
import { getTrades, type NewTrade } from '@/api/trade'
import EmptyState from '@/components/EmptyState.vue'
import ItemCard from '@/components/ItemCard.vue'
import { useFavoriteStore, type FavoriteType } from '@/stores/favorite'
import { useUserStore } from '@/stores/user'

interface MyPostItem {
  id: number | string
  type: FavoriteType
  title: string
  description: string
  location: string
}

type TradeRecord = NewTrade & { id: number }
type LostFoundRecord = NewLostFound & { id: number }
type GroupBuyRecord = NewGroupBuy & { id: number }
type ErrandRecord = NewErrand & { id: number }

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()
const myPosts = ref<MyPostItem[]>([])
const postError = ref('')

const typeLabels: Record<FavoriteType, string> = {
  trade: '二手交易',
  lostFound: '失物招领',
  groupBuy: '拼单搭子',
  errand: '跑腿委托',
}

function getTypeLabel(type: FavoriteType) {
  return typeLabels[type]
}

onMounted(async () => {
  try {
    const [tradeResponse, lostFoundResponse, groupBuyResponse, errandResponse] = await Promise.all([
      getTrades(),
      getLostFounds(),
      getGroupBuys(),
      getErrands(),
    ])

    const trades = tradeResponse.data as TradeRecord[]
    const lostFounds = lostFoundResponse.data as LostFoundRecord[]
    const groupBuys = groupBuyResponse.data as GroupBuyRecord[]
    const errands = errandResponse.data as ErrandRecord[]
    const displayName = userStore.displayName

    myPosts.value = [
      ...trades
        .filter((item) => item.publisher === displayName)
        .map((item) => ({
          id: item.id,
          type: 'trade' as const,
          title: item.title,
          description: item.description,
          location: item.location,
        })),
      ...lostFounds
        .filter((item) => item.contact === displayName)
        .map((item) => ({
          id: item.id,
          type: 'lostFound' as const,
          title: item.title,
          description: item.description,
          location: item.location,
        })),
      ...groupBuys
        .filter((item) => item.publisher === displayName)
        .map((item) => ({
          id: item.id,
          type: 'groupBuy' as const,
          title: item.title,
          description: item.description,
          location: item.location,
        })),
      ...errands
        .filter((item) => item.publisher === displayName)
        .map((item) => ({
          id: item.id,
          type: 'errand' as const,
          title: item.title,
          description: item.description,
          location: `${item.pickupLocation} → ${item.deliveryLocation}`,
        })),
    ]
  } catch {
    postError.value = '我的发布加载失败，请确认JSON Server已启动。'
  }
})
</script>

<template>
  <main class="page">
    <header class="page-header">
      <span class="page-tag">个人资料与内容管理</span>
      <h1>个人中心</h1>
      <p>查看当前用户资料，以及跨页面共享的收藏和发布内容。</p>
    </header>

    <section class="profile-card">
      <div class="avatar" aria-hidden="true">{{ userStore.displayName.slice(0, 1) }}</div>
      <div class="profile-content">
        <h2>{{ userStore.displayName }}</h2>
        <p class="profile-meta">{{ userStore.userDescription }}</p>
        <p class="profile-bio">{{ userStore.currentUser.bio }}</p>
      </div>
      <div class="profile-stats">
        <div>
          <strong>{{ favoriteStore.favoriteCount }}</strong>
          <span>我的收藏</span>
        </div>
        <div>
          <strong>{{ myPosts.length }}</strong>
          <span>我的发布</span>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="section-heading">
        <div>
          <h2>我的收藏</h2>
          <p>收藏状态由Pinia在多个页面之间共享。</p>
        </div>
        <span>{{ favoriteStore.favoriteCount }}项</span>
      </div>

      <EmptyState
        v-if="favoriteStore.favorites.length === 0"
        text="暂无收藏内容，可前往业务列表添加收藏"
      />
      <div v-else class="data-list">
        <ItemCard
          v-for="item in favoriteStore.favorites"
          :key="`${item.type}-${item.id}`"
          :title="item.title"
          :description="item.description"
          :location="item.location || '校园内'"
          time="已收藏"
          :publisher="userStore.displayName"
          status="open"
          :tag="getTypeLabel(item.type)"
        >
          <template #footer>
            <button
              class="remove-button"
              type="button"
              @click="favoriteStore.removeFavorite(item.type, item.id)"
            >
              取消收藏
            </button>
          </template>
        </ItemCard>
      </div>
    </section>

    <section class="content-section">
      <div class="section-heading">
        <div>
          <h2>我的发布</h2>
          <p>从四类已有接口中筛选当前用户发布的信息。</p>
        </div>
        <span>{{ myPosts.length }}项</span>
      </div>

      <EmptyState
        v-if="myPosts.length === 0"
        :text="postError || '暂无发布内容，可前往发布页面新增信息'"
      />
      <div v-else class="data-list">
        <ItemCard
          v-for="item in myPosts"
          :key="`${item.type}-${item.id}`"
          :title="item.title"
          :description="item.description"
          :location="item.location"
          time="我的发布"
          :publisher="userStore.displayName"
          status="open"
          :tag="getTypeLabel(item.type)"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.profile-card {
  margin-bottom: 28px;
  padding: 26px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  border: 1px solid #dfe5ee;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 7px 24px rgb(23 32 51 / 5%);
}

.avatar {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #ffffff;
  background: #0f766e;
  font-size: 22px;
  font-weight: 700;
}

.profile-content h2,
.profile-content p {
  margin: 0;
}

.profile-content h2 {
  color: #172033;
  font-size: 22px;
}

.profile-meta {
  margin-top: 5px !important;
  color: #2563eb;
  font-size: 14px;
  font-weight: 600;
}

.profile-bio {
  margin-top: 8px !important;
  color: #64748b;
  font-size: 14px;
}

.profile-stats {
  display: flex;
  gap: 12px;
}

.profile-stats div {
  min-width: 94px;
  padding: 13px 16px;
  border: 1px solid #e5eaf1;
  border-radius: 8px;
  background: #f8fafc;
  text-align: center;
}

.profile-stats strong,
.profile-stats span {
  display: block;
}

.profile-stats strong {
  color: #172033;
  font-size: 20px;
}

.profile-stats span {
  margin-top: 3px;
  color: #64748b;
  font-size: 12px;
}

.content-section + .content-section {
  margin-top: 34px;
}

.section-heading {
  margin-bottom: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
}

.section-heading h2,
.section-heading p {
  margin: 0;
}

.section-heading h2 {
  color: #172033;
  font-size: 20px;
}

.section-heading p {
  margin-top: 5px;
  color: #64748b;
  font-size: 13px;
}

.section-heading > span {
  padding: 5px 9px;
  border-radius: 4px;
  color: #1d4ed8;
  background: #eff6ff;
  font-size: 12px;
  font-weight: 600;
}

@media (max-width: 720px) {
  .profile-card {
    grid-template-columns: auto 1fr;
  }

  .profile-stats {
    grid-column: 1 / -1;
    width: 100%;
  }

  .profile-stats div {
    flex: 1;
  }
}
</style>
