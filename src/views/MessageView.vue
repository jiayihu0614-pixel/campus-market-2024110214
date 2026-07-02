<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useUserStore } from '@/stores/user'

interface ChatMessage {
  id: number
  text: string
  time: string
  fromMe: boolean
}

interface Conversation {
  id: number
  contact: string
  college: string
  topic: string
  category: string
  unread: number
  messages: ChatMessage[]
}

const userStore = useUserStore()
const route = useRoute()
const conversations = ref<Conversation[]>([])
const activeId = ref(1)
const draft = ref('')

const activeConversation = computed(() => {
  return conversations.value.find((item) => item.id === activeId.value) ?? null
})

function storageKey() {
  return `campus-market-messages-${userStore.currentUser?.id ?? 'guest'}`
}

function createInitialConversations(): Conversation[] {
  return [
    {
      id: 1,
      contact: '林同学',
      college: '计算机学院',
      topic: '《软件工程导论》教材',
      category: '二手交易',
      unread: 2,
      messages: [
        { id: 1, text: `你好，${userStore.displayName}，看到你收藏了我的教材，这本书还在。`, time: '09:26', fromMe: false },
        { id: 2, text: '内页只有少量笔记，可以在东区宿舍楼下当面看。', time: '09:27', fromMe: false },
      ],
    },
    {
      id: 2,
      contact: '李同学',
      college: '外国语学院',
      topic: '西门附近丢失黑色耳机盒',
      category: '失物招领',
      unread: 1,
      messages: [
        { id: 1, text: '你好，请问你是不是在西门附近看到过一个黑色耳机盒？', time: '昨天 18:42', fromMe: false },
      ],
    },
    {
      id: 3,
      contact: '高同学',
      college: '文学院',
      topic: '求帮取快递到 6 栋宿舍',
      category: '跑腿委托',
      unread: 0,
      messages: [
        { id: 1, text: '你好，快递是两个小件，下午六点前送到楼下就可以。', time: '周一 15:10', fromMe: false },
        { id: 2, text: '好的，我下课后可以顺路帮你取。', time: '周一 15:13', fromMe: true },
      ],
    },
  ]
}

function saveConversations() {
  localStorage.setItem(storageKey(), JSON.stringify(conversations.value))
}

function selectConversation(id: number) {
  activeId.value = id
  const conversation = conversations.value.find((item) => item.id === id)
  if (conversation) conversation.unread = 0
  saveConversations()
}

function sendMessage() {
  const text = draft.value.trim()
  const conversation = activeConversation.value
  if (!text || !conversation) return

  conversation.messages.push({
    id: Date.now(),
    text,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    fromMe: true,
  })
  draft.value = ''
  saveConversations()
}

function openRequestedConversation() {
  const contact = typeof route.query.contact === 'string' ? route.query.contact : ''
  const topic = typeof route.query.topic === 'string' ? route.query.topic : ''
  const category = typeof route.query.category === 'string' ? route.query.category : '校园信息'
  if (!contact || !topic) return

  let conversation = conversations.value.find((entry) => entry.contact === contact && entry.topic === topic)
  if (!conversation) {
    conversation = {
      id: Date.now(),
      contact,
      college: '校园用户',
      topic,
      category,
      unread: 0,
      messages: [
        {
          id: Date.now() + 1,
          text: `你好，我是${contact}，可以在这里沟通「${topic}」的具体信息。`,
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          fromMe: false,
        },
      ],
    }
    conversations.value.unshift(conversation)
  }
  activeId.value = conversation.id
  saveConversations()
}

onMounted(() => {
  if (!userStore.isLoggedIn) return

  const saved = localStorage.getItem(storageKey())
  if (saved) {
    try {
      conversations.value = JSON.parse(saved) as Conversation[]
    } catch {
      conversations.value = createInitialConversations()
    }
  } else {
    conversations.value = createInitialConversations()
  }
  openRequestedConversation()
})
</script>

<template>
  <main class="page">
    <header class="page-header">
      <span class="page-tag">校内沟通</span>
      <h1>消息中心</h1>
      <p v-if="userStore.isLoggedIn">{{ userStore.displayName }}，你可以在这里查看同学发来的消息并直接回复。</p>
    </header>

    <section v-if="!userStore.isLoggedIn" class="login-required">
      <span aria-hidden="true">信</span>
      <h2>登录后查看私聊消息</h2>
      <p>登录后，其他同学才能通过你发布的信息与你联系。</p>
      <RouterLink to="/login?redirect=/message">去登录</RouterLink>
    </section>

    <section v-else class="message-layout">
      <aside class="conversation-panel">
        <div class="panel-title">
          <h2>最近会话</h2>
          <span>{{ conversations.length }}</span>
        </div>
        <button
          v-for="conversation in conversations"
          :key="conversation.id"
          class="conversation-item"
          :class="{ 'is-active': conversation.id === activeId }"
          type="button"
          @click="selectConversation(conversation.id)"
        >
          <span class="avatar" aria-hidden="true">{{ conversation.contact.slice(0, 1) }}</span>
          <span class="conversation-copy">
            <strong>{{ conversation.contact }}</strong>
            <small>{{ conversation.messages.at(-1)?.text }}</small>
          </span>
          <span v-if="conversation.unread" class="unread">{{ conversation.unread }}</span>
        </button>
      </aside>

      <section v-if="activeConversation" class="chat-panel">
        <header class="chat-header">
          <div>
            <h2>{{ activeConversation.contact }}</h2>
            <p>{{ activeConversation.college }}</p>
          </div>
          <span>{{ activeConversation.category }}</span>
        </header>

        <div class="topic-card">
          <span>正在咨询</span>
          <strong>{{ activeConversation.topic }}</strong>
        </div>

        <div class="chat-history" aria-live="polite">
          <div
            v-for="message in activeConversation.messages"
            :key="message.id"
            class="message-row"
            :class="{ 'is-mine': message.fromMe }"
          >
            <div class="message-bubble">
              <p>{{ message.text }}</p>
              <time>{{ message.time }}</time>
            </div>
          </div>
        </div>

        <form class="message-composer" @submit.prevent="sendMessage">
          <input v-model="draft" type="text" :placeholder="`回复${activeConversation.contact}`" />
          <button type="submit" :disabled="!draft.trim()">发送</button>
        </form>
      </section>
    </section>
  </main>
</template>

<style scoped>
.message-layout { min-height: 590px; display: grid; grid-template-columns: 320px minmax(0, 1fr); overflow: hidden; border: 1px solid var(--color-border-soft); border-radius: 18px; background: #ffffff; }
.conversation-panel { border-right: 1px solid var(--color-border-soft); background: #fafafa; }
.panel-title { padding: 20px; display: flex; align-items: center; justify-content: space-between; }
.panel-title h2 { margin: 0; font-size: 17px; }
.panel-title span { padding: 4px 9px; border-radius: 999px; color: var(--color-primary-active); background: var(--color-primary-soft); font-size: 12px; }
.conversation-item { width: 100%; padding: 15px 18px; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 11px; border: 0; border-top: 1px solid var(--color-border-soft); color: inherit; background: transparent; text-align: left; }
.conversation-item:hover,
.conversation-item.is-active { background: #ffffff; }
.conversation-item.is-active { box-shadow: inset 3px 0 var(--color-primary); }
.avatar { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 50%; color: #ffffff; background: #476b62; font-weight: 700; }
.conversation-copy { min-width: 0; display: grid; gap: 4px; }
.conversation-copy strong { font-size: 14px; }
.conversation-copy small { overflow: hidden; color: var(--color-muted); font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.unread { min-width: 20px; height: 20px; padding: 0 6px; display: grid; place-items: center; border-radius: 999px; color: #ffffff; background: var(--color-primary); font-size: 11px; }
.chat-panel { min-width: 0; display: grid; grid-template-rows: auto auto minmax(280px, 1fr) auto; }
.chat-header { padding: 18px 22px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-border-soft); }
.chat-header h2,
.chat-header p { margin: 0; }
.chat-header h2 { font-size: 17px; }
.chat-header p { margin-top: 3px; color: var(--color-muted); font-size: 12px; }
.chat-header > span { padding: 6px 10px; border-radius: 999px; color: var(--color-primary-active); background: var(--color-primary-soft); font-size: 12px; }
.topic-card { margin: 16px 22px 0; padding: 13px 15px; display: grid; gap: 4px; border: 1px solid var(--color-border-soft); border-radius: 12px; background: var(--color-page); }
.topic-card span { color: var(--color-muted); font-size: 11px; }
.topic-card strong { font-size: 14px; }
.chat-history { padding: 22px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
.message-row { display: flex; justify-content: flex-start; }
.message-row.is-mine { justify-content: flex-end; }
.message-bubble { max-width: min(74%, 520px); padding: 11px 13px 8px; border-radius: 14px 14px 14px 4px; color: var(--color-body); background: var(--color-page); }
.is-mine .message-bubble { border-radius: 14px 14px 4px 14px; color: #ffffff; background: var(--color-primary); }
.message-bubble p { margin: 0; font-size: 14px; line-height: 1.6; }
.message-bubble time { margin-top: 4px; display: block; color: var(--color-muted-soft); font-size: 10px; text-align: right; }
.is-mine .message-bubble time { color: rgb(255 255 255 / 76%); }
.message-composer { padding: 16px 20px; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 10px; border-top: 1px solid var(--color-border-soft); }
.message-composer input { min-width: 0; padding: 11px 14px; border: 1px solid var(--color-border); border-radius: 999px; outline: 0; }
.message-composer input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-soft); }
.message-composer button,
.login-required a { padding: 10px 18px; border: 0; border-radius: 999px; color: #ffffff; background: var(--color-primary); font-weight: 600; }
.message-composer button:disabled { opacity: 0.5; cursor: not-allowed; }
.login-required { padding: 56px 28px; display: grid; place-items: center; gap: 10px; border: 1px solid var(--color-border-soft); border-radius: 18px; background: #ffffff; text-align: center; }
.login-required > span { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 50%; color: var(--color-primary-active); background: var(--color-primary-soft); font-weight: 700; }
.login-required h2,
.login-required p { margin: 0; }
.login-required p { color: var(--color-muted); }
.login-required a { margin-top: 8px; }

@media (max-width: 760px) {
  .message-layout { grid-template-columns: 1fr; }
  .conversation-panel { border-right: 0; border-bottom: 1px solid var(--color-border-soft); }
  .chat-panel { min-height: 540px; }
}
</style>
