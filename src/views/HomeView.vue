<script setup lang="ts">
import { computed, ref } from 'vue'

type Category = '全部' | '数码' | '书籍' | '生活' | '运动'

interface MarketItem {
  id: number
  title: string
  category: Exclude<Category, '全部'>
  price: number
  condition: string
  location: string
  image: string
}

const categories: Category[] = ['全部', '数码', '书籍', '生活', '运动']
const keyword = ref('')
const activeCategory = ref<Category>('全部')
const favorites = ref<number[]>([])

const items: MarketItem[] = [
  { id: 1, title: '机械键盘 87 键', category: '数码', price: 129, condition: '九成新', location: '东区宿舍', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: '高等数学同济版', category: '书籍', price: 18, condition: '有少量笔记', location: '图书馆', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: '宿舍折叠收纳架', category: '生活', price: 35, condition: '八成新', location: '西区宿舍', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: '羽毛球拍双拍套装', category: '运动', price: 68, condition: '轻微使用痕迹', location: '体育馆', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: '便携蓝牙音箱', category: '数码', price: 79, condition: '功能正常', location: '北区食堂', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: '设计心理学套装', category: '书籍', price: 42, condition: '九成新', location: '教学楼 A', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80' },
]

const filteredItems = computed(() => {
  const query = keyword.value.trim().toLowerCase()
  return items.filter((item) => {
    const matchesCategory = activeCategory.value === '全部' || item.category === activeCategory.value
    const matchesKeyword = !query || `${item.title}${item.category}${item.location}`.toLowerCase().includes(query)
    return matchesCategory && matchesKeyword
  })
})

function toggleFavorite(id: number) {
  favorites.value = favorites.value.includes(id)
    ? favorites.value.filter((favoriteId) => favoriteId !== id)
    : [...favorites.value, id]
}
</script>

<template>
  <main>
    <section class="intro">
      <div>
        <p class="eyebrow">CAMPUS MARKET</p>
        <h1>发现同校好物</h1>
        <p class="intro-copy">让闲置物品在校园里继续发挥价值。</p>
      </div>
      <div class="stats" aria-label="集市数据">
        <strong>{{ items.length }}</strong>
        <span>件在售好物</span>
      </div>
    </section>

    <section class="market" aria-label="闲置物品列表">
      <div class="toolbar">
        <label class="search-field">
          <span class="search-icon" aria-hidden="true">⌕</span>
          <input v-model="keyword" type="search" placeholder="搜索物品、分类或地点" aria-label="搜索闲置物品" />
        </label>
        <div class="category-list" aria-label="按分类筛选">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            :class="{ active: activeCategory === category }"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div class="result-heading">
        <h2>{{ activeCategory === '全部' ? '最新发布' : activeCategory }}</h2>
        <span>找到 {{ filteredItems.length }} 件</span>
      </div>

      <div v-if="filteredItems.length" class="item-grid">
        <article v-for="item in filteredItems" :key="item.id" class="item-card">
          <div class="image-wrap">
            <img :src="item.image" :alt="item.title" loading="lazy" />
            <span class="condition">{{ item.condition }}</span>
            <button
              class="favorite"
              :class="{ selected: favorites.includes(item.id) }"
              type="button"
              :aria-label="favorites.includes(item.id) ? `取消收藏${item.title}` : `收藏${item.title}`"
              @click="toggleFavorite(item.id)"
            >
              {{ favorites.includes(item.id) ? '♥' : '♡' }}
            </button>
          </div>
          <div class="item-info">
            <div class="item-topline">
              <h3>{{ item.title }}</h3>
              <strong>¥{{ item.price }}</strong>
            </div>
            <p>{{ item.location }} · {{ item.category }}</p>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <strong>暂时没有匹配的物品</strong>
        <p>换个关键词或分类试试。</p>
        <button type="button" @click="keyword = ''; activeCategory = '全部'">清除筛选</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.intro {
  min-height: 210px;
  padding: 42px max(20px, calc((100% - 1120px) / 2));
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  color: #ffffff;
  background: #173c32;
}

.eyebrow {
  margin: 0 0 10px;
  color: #8fd3bb;
  font-size: 12px;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(34px, 5vw, 54px);
  line-height: 1.1;
  letter-spacing: 0;
}

.intro-copy {
  margin: 14px 0 0;
  color: #d6e5df;
}

.stats {
  min-width: 120px;
  padding-left: 24px;
  border-left: 1px solid #63847a;
}

.stats strong,
.stats span {
  display: block;
}

.stats strong {
  font-size: 32px;
}

.stats span {
  margin-top: 3px;
  color: #b8cec6;
  font-size: 13px;
}

.market {
  max-width: 1120px;
  margin: 0 auto;
  padding: 30px 20px 56px;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.search-field {
  width: min(360px, 100%);
  height: 42px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 13px;
  border: 1px solid #ccd5d0;
  border-radius: 6px;
  background: #ffffff;
}

.search-field:focus-within {
  border-color: #087f5b;
  box-shadow: 0 0 0 3px rgb(8 127 91 / 12%);
}

.search-icon {
  color: #65726c;
  font-size: 22px;
}

.search-field input {
  width: 100%;
  border: 0;
  outline: 0;
  color: #17201c;
  background: transparent;
}

.category-list {
  display: flex;
  gap: 6px;
  overflow-x: auto;
}

.category-list button,
.empty-state button {
  min-height: 36px;
  padding: 0 15px;
  border: 1px solid #ccd5d0;
  border-radius: 5px;
  color: #43504a;
  background: #ffffff;
  cursor: pointer;
  white-space: nowrap;
}

.category-list button.active {
  border-color: #087f5b;
  color: #ffffff;
  background: #087f5b;
}

.result-heading {
  margin: 34px 0 16px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.result-heading h2 {
  margin: 0;
  font-size: 22px;
}

.result-heading span {
  color: #77827d;
  font-size: 13px;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.item-card {
  overflow: hidden;
  border: 1px solid #dfe5e1;
  border-radius: 7px;
  background: #ffffff;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgb(23 32 28 / 10%);
}

.image-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #e7ece9;
}

.image-wrap img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.condition {
  position: absolute;
  left: 10px;
  bottom: 10px;
  padding: 5px 8px;
  border-radius: 4px;
  color: #ffffff;
  background: rgb(23 32 28 / 78%);
  font-size: 12px;
}

.favorite {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 50%;
  color: #34423c;
  background: rgb(255 255 255 / 92%);
  box-shadow: 0 2px 8px rgb(23 32 28 / 12%);
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
}

.favorite.selected {
  color: #d9485f;
}

.item-info {
  padding: 15px;
}

.item-topline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.item-topline h3 {
  margin: 0;
  font-size: 16px;
  line-height: 1.45;
}

.item-topline strong {
  flex: none;
  color: #d9485f;
  font-size: 18px;
}

.item-info p {
  margin: 9px 0 0;
  color: #77827d;
  font-size: 13px;
}

.empty-state {
  padding: 70px 20px;
  text-align: center;
  border-top: 1px solid #dfe5e1;
}

.empty-state p {
  color: #77827d;
}

.empty-state button {
  margin-top: 6px;
}

@media (max-width: 800px) {
  .toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .search-field {
    width: 100%;
  }

  .item-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .intro {
    min-height: 190px;
    padding-top: 32px;
    padding-bottom: 32px;
  }

  .stats {
    display: none;
  }

  .market {
    padding-top: 22px;
  }

  .item-grid {
    grid-template-columns: 1fr;
  }
}
</style>
