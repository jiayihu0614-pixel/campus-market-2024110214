<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { createUser, getUsers } from '@/api/user'
import FormField from '@/components/FormField.vue'

const router = useRouter()
const submitting = ref(false)
const errorMessage = ref('')
const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  name: '',
  college: '',
  grade: '',
  campus: '',
  bio: '',
})

async function handleRegister() {
  errorMessage.value = ''

  if (!form.username.trim() || !form.password || !form.name.trim()) {
    errorMessage.value = '请填写学号、密码和昵称'
    return
  }

  if (form.password.length < 6) {
    errorMessage.value = '密码长度不能少于6位'
    return
  }

  if (form.password !== form.confirmPassword) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }

  submitting.value = true

  try {
    const usersResponse = await getUsers()
    const exists = usersResponse.data.some((item) => item.username === form.username.trim())

    if (exists) {
      errorMessage.value = '该学号已经存在'
      return
    }

    await createUser({
      username: form.username.trim(),
      password: form.password,
      name: form.name.trim(),
      college: form.college.trim() || '学院未填写',
      grade: form.grade.trim() || '年级未填写',
      campus: form.campus.trim() || '校区未填写',
      avatar: '',
      bio: form.bio.trim() || '这个同学暂时还没有填写简介。',
    })

    alert('注册成功，请使用新账号登录')
    await router.push({ path: '/login', query: { username: form.username.trim() } })
  } catch {
    errorMessage.value = '注册失败，请确认JSON Server已启动'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="register-page">
    <section class="register-card">
      <header>
        <span class="page-tag">注册</span>
        <h1>创建校园账号</h1>
        <p>填写基础资料，注册成功后使用学号和密码登录。</p>
      </header>

      <form class="register-form" @submit.prevent="handleRegister">
        <FormField label="学号" required>
          <input v-model="form.username" type="text" autocomplete="username" />
        </FormField>
        <FormField label="昵称" required>
          <input v-model="form.name" type="text" />
        </FormField>
        <FormField label="密码" required>
          <input v-model="form.password" type="password" autocomplete="new-password" />
        </FormField>
        <FormField label="确认密码" required>
          <input v-model="form.confirmPassword" type="password" autocomplete="new-password" />
        </FormField>
        <FormField label="学院">
          <input v-model="form.college" type="text" placeholder="例如：计算机学院" />
        </FormField>
        <FormField label="年级">
          <input v-model="form.grade" type="text" placeholder="例如：2023级" />
        </FormField>
        <FormField label="校区">
          <input v-model="form.campus" type="text" placeholder="例如：成龙校区" />
        </FormField>
        <FormField class="wide-field" label="个人简介">
          <textarea v-model="form.bio" rows="4" placeholder="简单介绍一下自己" />
        </FormField>

        <p v-if="errorMessage" class="register-error wide-field">{{ errorMessage }}</p>
        <div class="register-actions wide-field">
          <RouterLink to="/login">已有账号，去登录</RouterLink>
          <button type="submit" :disabled="submitting">
            {{ submitting ? '注册中...' : '注册' }}
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
.register-page {
  display: grid;
  place-items: center;
}

.register-card {
  width: min(820px, 100%);
  padding: 36px;
  border: 1px solid var(--color-border-soft);
  border-radius: 20px;
  background: var(--color-card);
  box-shadow: 0 8px 24px rgb(0 0 0 / 6%);
}

.register-card h1,
.register-card header p {
  margin: 0;
}

.register-card h1 {
  color: var(--color-ink);
  font-size: 27px;
}

.register-card header p {
  margin-top: 9px;
  color: var(--color-muted);
}

.register-form {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 22px;
}

.register-form :deep(input),
.register-form :deep(textarea) {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  outline: none;
}

.register-form :deep(input:focus),
.register-form :deep(textarea:focus) {
  border-color: var(--color-ink);
  box-shadow: 0 0 0 2px rgb(34 34 34 / 8%);
}

.wide-field {
  grid-column: 1 / -1;
}

.register-error {
  margin: 0;
  color: var(--color-primary-active);
  font-size: 13px;
}

.register-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
}

.register-actions a {
  color: var(--color-muted);
  font-size: 13px;
}

.register-actions button {
  min-width: 120px;
  padding: 12px 20px;
  border: 0;
  border-radius: 999px;
  color: #ffffff;
  background: var(--color-primary);
  font-weight: 650;
}

.register-actions button:disabled {
  opacity: 0.65;
}

.register-note {
  margin: 24px 0 0;
  padding-top: 18px;
  border-top: 1px solid var(--color-border-soft);
  color: var(--color-muted);
  font-size: 12px;
}

@media (max-width: 700px) {
  .register-card {
    padding: 26px;
  }

  .register-form {
    grid-template-columns: 1fr;
  }

  .wide-field {
    grid-column: auto;
  }
}
</style>
