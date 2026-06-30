<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { createErrand } from '@/api/errand'
import { createGroupBuy } from '@/api/groupBuy'
import { createLostFound } from '@/api/lostFound'
import { createTrade } from '@/api/trade'
import FormField from '@/components/FormField.vue'

type BusinessType = 'trade' | 'lostFound' | 'groupBuy' | 'errand'

interface PublishForm {
  title: string
  description: string
  location: string
  type: BusinessType
  price: number | null
  category: string
  condition: string
  lostFoundType: 'lost' | 'found'
  itemName: string
  time: string
  groupType: string
  targetCount: number | null
  deadline: string
  taskType: string
  reward: number | null
  pickupLocation: string
  deliveryLocation: string
}

const router = useRouter()
const submitting = ref(false)
const errors = reactive<Record<string, string>>({})

const form = reactive<PublishForm>({
  title: '',
  description: '',
  location: '',
  type: 'trade',
  price: null,
  category: '',
  condition: '',
  lostFoundType: 'lost',
  itemName: '',
  time: '',
  groupType: '',
  targetCount: 2,
  deadline: '',
  taskType: '',
  reward: null,
  pickupLocation: '',
  deliveryLocation: '',
})

function clearErrors() {
  Object.keys(errors).forEach((key) => delete errors[key])
}

function validate() {
  clearErrors()

  if (!form.title.trim()) errors.title = '请输入标题'
  if (!form.description.trim()) errors.description = '请输入详细描述'
  if (!form.location.trim()) errors.location = '请输入地点'

  if (form.type === 'trade') {
    if (!form.price || form.price <= 0) errors.price = '价格必须大于0'
    if (!form.category.trim()) errors.category = '请输入商品分类'
    if (!form.condition.trim()) errors.condition = '请输入商品成色'
  }

  if (form.type === 'lostFound') {
    if (!form.itemName.trim()) errors.itemName = '请输入物品名称'
    if (!form.time) errors.time = '请选择发生时间'
  }

  if (form.type === 'groupBuy') {
    if (!form.groupType.trim()) errors.groupType = '请输入拼单类型'
    if (!form.targetCount || form.targetCount < 2) errors.targetCount = '目标人数不能少于2人'
    if (!form.deadline) errors.deadline = '请选择截止时间'
  }

  if (form.type === 'errand') {
    if (!form.taskType.trim()) errors.taskType = '请输入任务类型'
    if (!form.reward || form.reward <= 0) errors.reward = '酬劳必须大于0'
    if (!form.pickupLocation.trim()) errors.pickupLocation = '请输入取件地点'
    if (!form.deliveryLocation.trim()) errors.deliveryLocation = '请输入送达地点'
    if (!form.deadline) errors.deadline = '请选择截止时间'
  }

  return Object.keys(errors).length === 0
}

function currentTime() {
  return new Date().toLocaleString('zh-CN', { hour12: false }).replaceAll('/', '-')
}

function resetForm() {
  form.title = ''
  form.description = ''
  form.location = ''
  form.price = null
  form.category = ''
  form.condition = ''
  form.lostFoundType = 'lost'
  form.itemName = ''
  form.time = ''
  form.groupType = ''
  form.targetCount = 2
  form.deadline = ''
  form.taskType = ''
  form.reward = null
  form.pickupLocation = ''
  form.deliveryLocation = ''
  clearErrors()
}

async function submitForm() {
  if (!validate()) return

  submitting.value = true

  try {
    if (form.type === 'trade') {
      await createTrade({
        title: form.title.trim(),
        price: form.price as number,
        category: form.category.trim(),
        condition: form.condition.trim(),
        publisher: '校园用户',
        publishTime: currentTime(),
        location: form.location.trim(),
        image: '',
        status: 'open',
        description: form.description.trim(),
      })
      alert('二手信息发布成功')
      await router.push('/trade')
    } else if (form.type === 'lostFound') {
      await createLostFound({
        title: form.title.trim(),
        type: form.lostFoundType,
        itemName: form.itemName.trim(),
        location: form.location.trim(),
        time: form.time,
        contact: '站内联系发布者',
        description: form.description.trim(),
        status: 'open',
      })
      alert('失物招领信息发布成功')
      await router.push('/lost-found')
    } else if (form.type === 'groupBuy') {
      await createGroupBuy({
        title: form.title.trim(),
        type: form.groupType.trim(),
        targetCount: form.targetCount as number,
        currentCount: 1,
        deadline: form.deadline,
        location: form.location.trim(),
        publisher: '校园用户',
        status: 'open',
        description: form.description.trim(),
      })
      alert('拼单搭子信息发布成功')
      await router.push('/group-buy')
    } else {
      await createErrand({
        title: form.title.trim(),
        taskType: form.taskType.trim(),
        reward: form.reward as number,
        pickupLocation: form.pickupLocation.trim(),
        deliveryLocation: form.deliveryLocation.trim(),
        deadline: form.deadline,
        publisher: '校园用户',
        status: 'open',
        description: form.description.trim(),
      })
      alert('跑腿委托发布成功')
      await router.push('/errand')
    }
  } catch {
    alert('发布失败，请确认JSON Server已启动后重试')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="page">
    <header class="page-header">
      <span class="page-tag">校园信息发布</span>
      <h1>发布信息</h1>
      <p>选择发布类型并填写真实、清楚的校园信息。</p>
    </header>

    <form class="publish-form" @submit.prevent="submitForm">
      <section class="form-section">
        <h2>基本信息</h2>

        <FormField label="发布类型" required>
          <select v-model="form.type">
            <option value="trade">二手交易</option>
            <option value="lostFound">失物招领</option>
            <option value="groupBuy">拼单搭子</option>
            <option value="errand">跑腿委托</option>
          </select>
        </FormField>

        <FormField label="标题" required :error="errors.title">
          <input v-model="form.title" type="text" placeholder="请简要说明发布内容" />
        </FormField>

        <FormField label="详细描述" required :error="errors.description">
          <textarea
            v-model="form.description"
            rows="5"
            placeholder="请填写物品、活动或任务的具体情况"
          />
        </FormField>

        <FormField label="地点" required :error="errors.location">
          <input v-model="form.location" type="text" placeholder="例如：东区食堂或图书馆南门" />
        </FormField>
      </section>

      <section class="form-section">
        <h2>分类信息</h2>

        <template v-if="form.type === 'trade'">
          <FormField label="价格" required :error="errors.price">
            <input v-model.number="form.price" type="number" min="0.01" step="0.01" />
          </FormField>
          <FormField label="商品分类" required :error="errors.category">
            <input v-model="form.category" type="text" placeholder="例如：教材资料" />
          </FormField>
          <FormField label="商品成色" required :error="errors.condition">
            <select v-model="form.condition">
              <option value="">请选择成色</option>
              <option value="全新">全新</option>
              <option value="九成新">九成新</option>
              <option value="八成新">八成新</option>
              <option value="正常使用痕迹">正常使用痕迹</option>
            </select>
          </FormField>
        </template>

        <template v-else-if="form.type === 'lostFound'">
          <FormField label="信息类型" required>
            <select v-model="form.lostFoundType">
              <option value="lost">寻找失物</option>
              <option value="found">拾物招领</option>
            </select>
          </FormField>
          <FormField label="物品名称" required :error="errors.itemName">
            <input v-model="form.itemName" type="text" placeholder="例如：校园卡" />
          </FormField>
          <FormField label="发生时间" required :error="errors.time">
            <input v-model="form.time" type="datetime-local" />
          </FormField>
        </template>

        <template v-else-if="form.type === 'groupBuy'">
          <FormField label="拼单类型" required :error="errors.groupType">
            <input v-model="form.groupType" type="text" placeholder="例如：拼餐或运动搭子" />
          </FormField>
          <FormField label="目标人数" required :error="errors.targetCount">
            <input v-model.number="form.targetCount" type="number" min="2" />
          </FormField>
          <FormField label="截止时间" required :error="errors.deadline">
            <input v-model="form.deadline" type="datetime-local" />
          </FormField>
        </template>

        <template v-else>
          <FormField label="任务类型" required :error="errors.taskType">
            <input v-model="form.taskType" type="text" placeholder="例如：取快递或代送" />
          </FormField>
          <FormField label="酬劳" required :error="errors.reward">
            <input v-model.number="form.reward" type="number" min="0.01" step="0.01" />
          </FormField>
          <FormField label="取件地点" required :error="errors.pickupLocation">
            <input v-model="form.pickupLocation" type="text" />
          </FormField>
          <FormField label="送达地点" required :error="errors.deliveryLocation">
            <input v-model="form.deliveryLocation" type="text" />
          </FormField>
          <FormField label="截止时间" required :error="errors.deadline">
            <input v-model="form.deadline" type="datetime-local" />
          </FormField>
        </template>
      </section>

      <div class="form-actions">
        <button type="button" class="secondary-button" @click="resetForm">重置</button>
        <button type="submit" :disabled="submitting">
          {{ submitting ? '正在发布...' : '确认发布' }}
        </button>
      </div>
    </form>
  </main>
</template>

<style scoped>
.publish-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.form-section {
  padding: 24px;
  display: grid;
  align-content: start;
  gap: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
}

.form-section h2 {
  margin: 0;
  color: #111827;
  font-size: 18px;
}

.form-section :deep(input),
.form-section :deep(select),
.form-section :deep(textarea) {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  color: #111827;
  background: #ffffff;
  outline: none;
}

.form-section :deep(input:focus),
.form-section :deep(select:focus),
.form-section :deep(textarea:focus) {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgb(37 99 235 / 10%);
}

.form-section :deep(textarea) {
  resize: vertical;
}

.form-actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.form-actions button {
  min-width: 130px;
  padding: 11px 20px;
  border: 0;
  border-radius: 5px;
  color: #ffffff;
  background: #2563eb;
  cursor: pointer;
}

.form-actions button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.form-actions .secondary-button {
  color: #374151;
  background: #e5e7eb;
}

@media (max-width: 800px) {
  .publish-form {
    grid-template-columns: 1fr;
  }
}
</style>
