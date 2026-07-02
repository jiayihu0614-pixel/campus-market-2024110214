<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getErrands } from '@/api/errand'
import { getGroupBuys } from '@/api/groupBuy'
import { getLostFounds } from '@/api/lostFound'
import { getTrades } from '@/api/trade'
import ErrorState from '@/components/ErrorState.vue'
import ItemCard from '@/components/ItemCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import { useFavoriteStore, type FavoriteType } from '@/stores/favorite'
import { useUserStore } from '@/stores/user'

type RawItem = Record<string, unknown>

interface DetailItem {
  id: number
  type: FavoriteType
  typeLabel: string
  title: string
  description: string
  location: string
  time: string
  publisher: string
  status: string
  tag: string
  price?: string
  image: string
  facts: Array<{ label: string; value: string }>
  currentCount?: number
  targetCount?: number
}

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const favoriteStore = useFavoriteStore()
const item = ref<DetailItem | null>(null)
const relatedItems = ref<DetailItem[]>([])
const loading = ref(false)
const loadFailed = ref(false)

const typeLabels: Record<FavoriteType, string> = {
  trade: '二手交易',
  lostFound: '失物招领',
  groupBuy: '拼单搭子',
  errand: '跑腿委托',
}

const listPaths: Record<FavoriteType, string> = {
  trade: '/trade',
  lostFound: '/lost-found',
  groupBuy: '/group-buy',
  errand: '/errand',
}

function text(value: unknown, fallback = '') {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : fallback
}

function normalize(raw: RawItem, type: FavoriteType): DetailItem {
  const id = Number(raw.id)
  const publisher = type === 'lostFound' ? text(raw.contact, '未填写') : text(raw.publisher, '未填写')
  const location = type === 'errand'
    ? `${text(raw.pickupLocation)} → ${text(raw.deliveryLocation)}`
    : text(raw.location, '校园内')
  const time = type === 'trade'
    ? text(raw.publishTime)
    : type === 'lostFound'
      ? text(raw.time)
      : `截止 ${text(raw.deadline)}`
  const tag = type === 'trade'
    ? text(raw.category)
    : type === 'lostFound'
      ? `${text(raw.type) === 'found' ? '招领' : '寻物'}：${text(raw.itemName)}`
      : type === 'groupBuy'
        ? text(raw.type)
        : text(raw.taskType)
  const price = type === 'trade'
    ? `¥${text(raw.price)}`
    : type === 'errand'
      ? `酬劳 ¥${text(raw.reward)}`
      : undefined
  const facts = type === 'trade'
    ? [
        { label: '成色', value: text(raw.condition) },
        { label: '分类', value: text(raw.category) },
      ]
    : type === 'lostFound'
      ? [
          { label: '信息类型', value: text(raw.type) === 'found' ? '拾物招领' : '寻找失物' },
          { label: '物品名称', value: text(raw.itemName) },
        ]
      : type === 'groupBuy'
        ? [
            { label: '参与人数', value: `${text(raw.currentCount)}/${text(raw.targetCount)} 人` },
            { label: '活动类型', value: text(raw.type) },
          ]
        : [
            { label: '任务类型', value: text(raw.taskType) },
            { label: '期望完成', value: text(raw.deadline) },
          ]

  return {
    id,
    type,
    typeLabel: typeLabels[type],
    title: text(raw.title),
    description: text(raw.description),
    location,
    time,
    publisher,
    status: text(raw.status, 'open'),
    tag,
    price,
    image: text(raw.image),
    facts,
    currentCount: type === 'groupBuy' ? Number(raw.currentCount) : undefined,
    targetCount: type === 'groupBuy' ? Number(raw.targetCount) : undefined,
  }
}

async function fetchByType(type: FavoriteType) {
  if (type === 'trade') return (await getTrades()).data as RawItem[]
  if (type === 'lostFound') return (await getLostFounds()).data as RawItem[]
  if (type === 'groupBuy') return (await getGroupBuys()).data as RawItem[]
  return (await getErrands()).data as RawItem[]
}

async function loadDetail() {
  const type = route.params.type as FavoriteType
  const id = Number(route.params.id)
  if (!typeLabels[type] || !Number.isFinite(id)) {
    loadFailed.value = true
    return
  }

  loading.value = true
  loadFailed.value = false
  try {
    const records = await fetchByType(type)
    const normalized = records.map((record) => normalize(record, type))
    item.value = normalized.find((record) => record.id === id) ?? null
    relatedItems.value = normalized.filter((record) => record.id !== id).slice(0, 3)
    if (!item.value) loadFailed.value = true
  } catch {
    loadFailed.value = true
  } finally {
    loading.value = false
  }
}

const isOwnPost = computed(() => {
  return Boolean(item.value && userStore.isLoggedIn && item.value.publisher === userStore.displayName)
})

const canJoinGroup = computed(() => {
  if (!item.value || item.value.type !== 'groupBuy') return false
  return item.value.status === 'open' && (item.value.currentCount ?? 0) < (item.value.targetCount ?? 0)
})

async function contactPublisher() {
  if (!item.value) return
  if (!userStore.isLoggedIn) {
    await router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }
  await router.push({
    path: '/message',
    query: {
      contact: item.value.publisher,
      topic: item.value.title,
      category: item.value.typeLabel,
    },
  })
}

function toggleFavorite() {
  if (!item.value) return
  favoriteStore.toggleFavorite({
    id: item.value.id,
    type: item.value.type,
    title: item.value.title,
    description: item.value.description,
    location: item.value.location,
    time: item.value.time,
    publisher: item.value.publisher,
    status: item.value.status,
    price: item.value.price,
    tag: item.value.tag,
  })
}

onMounted(loadDetail)
watch(() => route.fullPath, loadDetail)
</script>

<template>
  <main class="page detail-page">
    <LoadingState v-if="loading" text="正在加载详情..." />
    <ErrorState v-else-if="loadFailed || !item" message="该信息不存在或暂时无法访问" @retry="loadDetail" />

    <template v-else>
      <nav class="breadcrumb" aria-label="面包屑">
        <RouterLink to="/">首页</RouterLink><span>/</span>
        <RouterLink :to="listPaths[item.type]">{{ item.typeLabel }}</RouterLink><span>/</span>
        <strong>{{ item.title }}</strong>
      </nav>

      <div class="detail-layout">
        <article class="detail-main">
          <img v-if="item.image" class="detail-image" :src="item.image" :alt="item.title" />
          <div class="detail-content">
            <div class="detail-tags"><span>{{ item.tag }}</span><span>{{ item.status === 'open' ? '进行中' : '已结束' }}</span></div>
            <h1>{{ item.title }}</h1>
            <p class="description">{{ item.description }}</p>
            <strong v-if="item.price" class="price">{{ item.price }}</strong>

            <dl class="facts">
              <div><dt>地点</dt><dd>{{ item.location }}</dd></div>
              <div><dt>时间</dt><dd>{{ item.time }}</dd></div>
              <div v-for="fact in item.facts" :key="fact.label"><dt>{{ fact.label }}</dt><dd>{{ fact.value }}</dd></div>
            </dl>
          </div>
        </article>

        <aside class="detail-side">
          <section class="publisher-card">
            <span class="publisher-avatar">{{ item.publisher.slice(0, 1) }}</span>
            <div><strong>{{ item.publisher }}</strong><p>已通过校园账号发布</p></div>
            <button v-if="!isOwnPost" class="primary-action" type="button" @click="contactPublisher">
              {{ userStore.isLoggedIn ? '联系发布者' : '登录后联系' }}
            </button>
            <p v-else class="own-post">这是你发布的信息</p>
            <RouterLink
              v-if="item.type === 'groupBuy' && !isOwnPost"
              class="join-action"
              :class="{ 'is-disabled': !canJoinGroup }"
              :to="canJoinGroup ? `/group-buy/${item.id}/join` : route.fullPath"
            >
              {{ canJoinGroup ? '报名参加' : '人数已满' }}
            </RouterLink>
            <button class="secondary-action" type="button" @click="toggleFavorite">
              {{ favoriteStore.isFavorite(item.type, item.id) ? '已收藏' : '收藏' }}
            </button>
          </section>
          <section class="safety-card"><h2>校内交易提醒</h2><p>建议在校园公共区域当面确认，不提前转账，不在聊天中发送身份证号等敏感信息。</p></section>
        </aside>
      </div>

      <section class="related-section">
        <h2>相关推荐</h2>
        <div class="related-grid">
          <ItemCard
            v-for="related in relatedItems"
            :key="related.id"
            :title="related.title"
            :description="related.description"
            :price="related.price"
            :location="related.location"
            :time="related.time"
            :publisher="related.publisher"
            :status="related.status"
            :tag="related.tag"
            :detail-to="`/detail/${related.type}/${related.id}`"
          />
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
.breadcrumb { margin-bottom: 22px; display: flex; gap: 9px; align-items: center; color: var(--color-muted); font-size: 13px; }
.breadcrumb strong { min-width: 0; overflow: hidden; color: var(--color-body); text-overflow: ellipsis; white-space: nowrap; }
.detail-layout { display: grid; grid-template-columns: minmax(0, 1fr) 330px; align-items: start; gap: 24px; }
.detail-main,
.publisher-card,
.safety-card { border: 1px solid var(--color-border-soft); border-radius: 18px; background: #ffffff; }
.detail-main { overflow: hidden; }
.detail-image { width: 100%; max-height: 520px; display: block; object-fit: cover; background: var(--color-page); }
.detail-content { padding: 28px; }
.detail-tags { display: flex; gap: 8px; }
.detail-tags span { padding: 6px 10px; border-radius: 999px; color: var(--color-primary-active); background: var(--color-primary-soft); font-size: 12px; }
.detail-content h1 { margin: 18px 0 10px; font-size: 30px; line-height: 1.35; }
.description { margin: 0; color: var(--color-muted); line-height: 1.85; }
.price { margin-top: 20px; display: block; color: var(--color-primary-active); font-size: 27px; }
.facts { margin: 26px 0 0; padding-top: 22px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 22px; border-top: 1px solid var(--color-border-soft); }
.facts div { display: grid; grid-template-columns: 82px minmax(0, 1fr); gap: 8px; }
.facts dt { color: var(--color-muted-soft); }
.facts dd { margin: 0; color: var(--color-body); }
.detail-side { display: grid; gap: 18px; }
.publisher-card { padding: 22px; display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 12px; }
.publisher-avatar { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 50%; color: #ffffff; background: #476b62; font-weight: 700; }
.publisher-card strong { font-size: 16px; }
.publisher-card p { margin: 4px 0 0; color: var(--color-muted); font-size: 12px; }
.publisher-card button,
.publisher-card .join-action,
.own-post { grid-column: 1 / -1; width: 100%; padding: 11px; border-radius: 12px; font-weight: 600; text-align: center; }
.primary-action { margin-top: 10px; border: 0; color: #ffffff; background: var(--color-primary); }
.secondary-action { border: 1px solid var(--color-border); color: var(--color-body); background: #ffffff; }
.join-action { color: var(--color-primary-active); background: var(--color-primary-soft); }
.join-action.is-disabled { color: var(--color-muted); background: var(--color-page); pointer-events: none; }
.publisher-card .own-post { box-sizing: border-box; color: #047857; background: #ecfdf5; text-align: center; }
.safety-card { padding: 22px; }
.safety-card h2 { margin: 0 0 10px; font-size: 17px; }
.safety-card p { margin: 0; color: var(--color-muted); font-size: 13px; line-height: 1.8; }
.related-section { margin-top: 36px; }
.related-section > h2 { margin: 0 0 16px; font-size: 21px; }
.related-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
@media (max-width: 900px) { .detail-layout { grid-template-columns: 1fr; } .related-grid { grid-template-columns: 1fr; } }
@media (max-width: 620px) { .facts { grid-template-columns: 1fr; } .detail-content h1 { font-size: 25px; } }
</style>
