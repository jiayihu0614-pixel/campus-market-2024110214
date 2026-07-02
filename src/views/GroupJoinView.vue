<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getGroupBuy, updateGroupBuy, type NewGroupBuy } from '@/api/groupBuy'
import ErrorState from '@/components/ErrorState.vue'
import LoadingState from '@/components/LoadingState.vue'
import { useActivityStore } from '@/stores/activity'
import { useUserStore } from '@/stores/user'

type GroupRecord = NewGroupBuy & { id: number }

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const activityStore = useActivityStore()
const group = ref<GroupRecord | null>(null)
const loading = ref(false)
const loadFailed = ref(false)
const submitting = ref(false)
const agreed = ref(false)
const alreadyJoined = ref(false)

const groupId = computed(() => Number(route.params.id))
const joinedKey = computed(() => `campus-market-joined-${userStore.currentUser?.id}-${groupId.value}`)
const isFull = computed(() => Boolean(group.value && group.value.currentCount >= group.value.targetCount))
const isClosed = computed(() => Boolean(group.value && group.value.status !== 'open'))
const isOwnPost = computed(() => Boolean(group.value && group.value.publisher === userStore.displayName))
const canJoin = computed(() => userStore.isLoggedIn && !alreadyJoined.value && !isFull.value && !isClosed.value && !isOwnPost.value)

async function loadGroup() {
  if (!Number.isFinite(groupId.value)) {
    loadFailed.value = true
    return
  }
  loading.value = true
  loadFailed.value = false
  try {
    group.value = (await getGroupBuy(groupId.value)).data
    if (userStore.currentUser) activityStore.loadForUser(userStore.currentUser.id)
    alreadyJoined.value = localStorage.getItem(joinedKey.value) === 'true'
  } catch {
    loadFailed.value = true
  } finally {
    loading.value = false
  }
}

async function submitJoin() {
  if (!userStore.isLoggedIn) {
    await router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }
  if (!group.value || !canJoin.value || !agreed.value) return

  submitting.value = true
  try {
    const nextCount = Math.min(group.value.currentCount + 1, group.value.targetCount)
    const nextStatus = nextCount >= group.value.targetCount ? 'closed' : group.value.status
    await updateGroupBuy(group.value.id, { currentCount: nextCount, status: nextStatus })
    localStorage.setItem(joinedKey.value, 'true')
    activityStore.addJoinedActivity({
      id: group.value.id,
      type: 'groupBuy',
      title: group.value.title,
      category: group.value.type,
      location: group.value.location,
      deadline: group.value.deadline,
      publisher: group.value.publisher,
      joinedAt: new Date().toISOString(),
    })
    alreadyJoined.value = true
    group.value.currentCount = nextCount
    group.value.status = nextStatus
    alert(nextStatus === 'closed' ? '报名成功，人数已满' : '报名成功')
    await router.push(`/detail/groupBuy/${group.value.id}`)
  } catch {
    alert('报名失败，请确认Mock服务正常后重试')
  } finally {
    submitting.value = false
  }
}

onMounted(loadGroup)
</script>

<template>
  <main class="page join-page">
    <LoadingState v-if="loading" text="正在加载拼单信息..." />
    <ErrorState v-else-if="loadFailed || !group" message="该拼单信息不存在" @retry="loadGroup" />

    <template v-else>
      <nav class="breadcrumb">
        <RouterLink to="/group-buy">拼单搭子</RouterLink><span>/</span><strong>报名确认</strong>
      </nav>
      <section class="join-card">
        <header>
          <span class="page-tag">{{ group.type }}</span>
          <h1>{{ group.title }}</h1>
          <p>{{ group.description }}</p>
        </header>

        <div class="progress-block">
          <div><strong>{{ group.currentCount }} / {{ group.targetCount }} 人</strong><span>{{ isFull ? '人数已满' : `还差 ${group.targetCount - group.currentCount} 人` }}</span></div>
          <div class="progress-track"><span :style="{ width: `${Math.min(100, (group.currentCount / group.targetCount) * 100)}%` }"></span></div>
        </div>

        <dl class="group-info">
          <div><dt>集合地点</dt><dd>{{ group.location }}</dd></div>
          <div><dt>截止时间</dt><dd>{{ group.deadline }}</dd></div>
          <div><dt>发布人</dt><dd>{{ group.publisher }}</dd></div>
          <div><dt>报名账号</dt><dd>{{ userStore.displayName }}</dd></div>
        </dl>

        <p v-if="!userStore.isLoggedIn" class="state-note">请先登录后报名。</p>
        <p v-else-if="isOwnPost" class="state-note">不能报名自己发布的拼单。</p>
        <p v-else-if="alreadyJoined" class="state-note is-success">你已经报名过该拼单。</p>
        <p v-else-if="isFull || isClosed" class="state-note">该拼单人数已满或已关闭，暂时无法报名。</p>

        <label v-if="canJoin" class="agreement">
          <input v-model="agreed" type="checkbox" />
          <span>我已确认集合地点和截止时间，并同意报名后与发布者沟通。</span>
        </label>

        <div class="actions">
          <RouterLink :to="`/detail/groupBuy/${group.id}`">返回详情</RouterLink>
          <button type="button" :disabled="!canJoin || !agreed || submitting" @click="submitJoin">
            {{ submitting ? '报名中...' : '确认报名' }}
          </button>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
.join-page { max-width: 820px; margin: 0 auto; }
.breadcrumb { margin-bottom: 20px; display: flex; gap: 9px; color: var(--color-muted); font-size: 13px; }
.join-card { padding: 30px; border: 1px solid var(--color-border-soft); border-radius: 20px; background: #ffffff; box-shadow: 0 8px 24px rgb(0 0 0 / 5%); }
.join-card h1 { margin: 0 0 10px; font-size: 28px; }
.join-card header > p { margin: 0; color: var(--color-muted); line-height: 1.75; }
.progress-block { margin: 26px 0; padding: 18px; border-radius: 14px; background: var(--color-page); }
.progress-block > div:first-child { display: flex; justify-content: space-between; gap: 16px; }
.progress-block span { color: var(--color-muted); font-size: 13px; }
.progress-track { height: 8px; margin-top: 12px; overflow: hidden; border-radius: 999px; background: #e5e5e5; }
.progress-track span { height: 100%; display: block; border-radius: inherit; background: var(--color-primary); }
.group-info { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.group-info div { padding: 14px; border: 1px solid var(--color-border-soft); border-radius: 12px; }
.group-info dt { color: var(--color-muted); font-size: 12px; }
.group-info dd { margin: 6px 0 0; color: var(--color-body); }
.state-note { margin: 22px 0 0; padding: 12px 14px; border-radius: 10px; color: var(--color-primary-active); background: var(--color-primary-soft); }
.state-note.is-success { color: #047857; background: #ecfdf5; }
.agreement { margin-top: 24px; display: flex; align-items: flex-start; gap: 10px; color: var(--color-body); font-size: 14px; line-height: 1.6; }
.agreement input { margin-top: 4px; }
.actions { margin-top: 26px; padding-top: 22px; display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid var(--color-border-soft); }
.actions a,
.actions button { padding: 11px 19px; border-radius: 999px; font-weight: 600; }
.actions a { border: 1px solid var(--color-border); }
.actions button { border: 0; color: #ffffff; background: var(--color-primary); }
.actions button:disabled { opacity: 0.5; cursor: not-allowed; }
@media (max-width: 620px) { .join-card { padding: 22px; } .group-info { grid-template-columns: 1fr; } }
</style>
