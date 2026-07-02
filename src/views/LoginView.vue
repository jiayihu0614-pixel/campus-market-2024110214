<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getUsers } from '@/api/user'
import FormField from '@/components/FormField.vue'
import { useUserStore, type CurrentUser } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const submitting = ref(false)
const errorMessage = ref('')
const form = reactive({
  username: typeof route.query.username === 'string' ? route.query.username : '',
  password: '',
})

async function handleLogin() {
  errorMessage.value = ''

  if (!form.username.trim() || !form.password) {
    errorMessage.value = '请输入用户名和密码'
    return
  }

  submitting.value = true

  try {
    const response = await getUsers()
    const matchedUser = response.data.find((item) => {
      return item.username === form.username.trim() && item.password === form.password
    })

    if (!matchedUser || matchedUser.id === undefined) {
      errorMessage.value = '用户名或密码错误'
      return
    }

    const currentUser: CurrentUser = {
      id: matchedUser.id,
      username: matchedUser.username,
      name: matchedUser.name,
      college: matchedUser.college,
      grade: matchedUser.grade,
      campus: matchedUser.campus,
      avatar: matchedUser.avatar,
      bio: matchedUser.bio,
    }
    userStore.login(currentUser)
    alert('登录成功')

    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.push(redirect)
  } catch {
    errorMessage.value = '登录失败，请确认JSON Server已启动'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <span class="page-tag">Mock登录</span>
      <h1>欢迎回到校园轻集市</h1>
      <p class="auth-intro">使用本地JSON Server账号登录，继续发布和管理校园信息。</p>

      <form class="auth-form" @submit.prevent="handleLogin">
        <FormField label="用户名" required>
          <input v-model="form.username" type="text" autocomplete="username" placeholder="请输入用户名" />
        </FormField>
        <FormField label="密码" required>
          <input
            v-model="form.password"
            type="password"
            autocomplete="current-password"
            placeholder="请输入密码"
          />
        </FormField>

        <p v-if="errorMessage" class="auth-error">{{ errorMessage }}</p>
        <button class="auth-primary" type="submit" :disabled="submitting">
          {{ submitting ? '登录中...' : '登录' }}
        </button>
      </form>

      <div class="auth-links">
        <span>还没有账号？</span>
        <RouterLink to="/register">创建Mock账号</RouterLink>
        <RouterLink to="/">游客浏览</RouterLink>
      </div>

      <p class="auth-note">本功能仅用于前端实训，不代表生产环境安全认证。</p>
    </section>
  </main>
</template>

<style scoped>
.auth-page {
  min-height: 620px;
  display: grid;
  place-items: center;
}

.auth-card {
  width: min(460px, 100%);
  padding: 36px;
  border: 1px solid var(--color-border-soft);
  border-radius: 20px;
  background: var(--color-card);
  box-shadow: 0 8px 24px rgb(0 0 0 / 6%);
}

.auth-card h1 {
  margin: 0;
  color: var(--color-ink);
  font-size: 27px;
}

.auth-intro,
.auth-note {
  color: var(--color-muted);
  line-height: 1.7;
}

.auth-intro {
  margin: 10px 0 26px;
}

.auth-form {
  display: grid;
  gap: 18px;
}

.auth-form :deep(input) {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  outline: none;
}

.auth-form :deep(input:focus) {
  border-color: var(--color-ink);
  box-shadow: 0 0 0 2px rgb(34 34 34 / 8%);
}

.auth-error {
  margin: 0;
  color: var(--color-primary-active);
  font-size: 13px;
}

.auth-primary {
  padding: 12px 20px;
  border: 0;
  border-radius: 999px;
  color: #ffffff;
  background: var(--color-primary);
  font-weight: 650;
}

.auth-primary:hover:not(:disabled) {
  background: var(--color-primary-active);
}

.auth-primary:disabled {
  opacity: 0.65;
}

.auth-links {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  color: var(--color-muted);
  font-size: 13px;
}

.auth-links a {
  color: var(--color-primary-active);
  font-weight: 600;
}

.auth-note {
  margin: 24px 0 0;
  padding-top: 18px;
  border-top: 1px solid var(--color-border-soft);
  font-size: 12px;
}
</style>
