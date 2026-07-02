<script setup lang="ts">
import campusLake from '@/assets/sicnu-autumn-1.jpg'
</script>

<template>
  <main class="page">
    <section class="home-intro">
      <div class="hero-copy">
        <span class="page-tag">川师校内 · 轻量交易 · 友好沟通</span>
        <h1>把校园里的闲置、招领、拼单和委托，放进一个清爽的集市。</h1>
        <p>面向学生日常生活，让信息可搜索、可管理，也让每一次校园互助更简单。</p>
        <div class="hero-actions">
          <RouterLink class="publish-button" to="/publish">去发布</RouterLink>
          <RouterLink class="browse-button" to="/trade">浏览集市</RouterLink>
        </div>
      </div>
      <figure class="hero-visual">
        <img :src="campusLake" alt="四川师范大学秋日校园湖景" />
      </figure>
    </section>

    <section>
      <div class="section-heading">
        <h2 class="section-title">从今天的校园需求开始</h2>
        <span>四类信息，一处查看</span>
      </div>
      <div class="business-grid">
        <RouterLink class="business-card" to="/trade">
          <span class="business-icon" aria-hidden="true">🛍️</span>
          <span class="business-copy">
            <strong>二手交易</strong>
            <span>发现校园内的教材、数码和生活闲置。</span>
          </span>
        </RouterLink>
        <RouterLink class="business-card" to="/lost-found">
          <span class="business-icon" aria-hidden="true">🔎</span>
          <span class="business-copy">
            <strong>失物招领</strong>
            <span>发布失物或拾物信息，帮助物品回到主人身边。</span>
          </span>
        </RouterLink>
        <RouterLink class="business-card" to="/group-buy">
          <span class="business-icon" aria-hidden="true">🤝</span>
          <span class="business-copy">
            <strong>拼单搭子</strong>
            <span>寻找拼餐、拼车、学习和活动伙伴。</span>
          </span>
        </RouterLink>
        <RouterLink class="business-card" to="/errand">
          <span class="business-icon" aria-hidden="true">📦</span>
          <span class="business-copy">
            <strong>跑腿委托</strong>
            <span>发布或承接校内取件、代买和送达任务。</span>
          </span>
        </RouterLink>
      </div>
    </section>

    <section class="recommend-section">
      <div class="section-heading">
        <h2 class="section-title">今日新鲜信息</h2>
        <RouterLink to="/trade">查看更多</RouterLink>
      </div>
      <div class="card-grid">
        <RouterLink class="story-card" to="/detail/trade/1">
          <div class="story-copy"><span class="page-tag">二手交易</span><h3>出闲置教材《软件工程导论》</h3><p>九成新，狮子山校区可当面查看。</p></div>
        </RouterLink>
        <RouterLink class="story-card" to="/detail/lostFound/1">
          <div class="story-copy"><span class="page-tag">失物招领</span><h3>西门附近丢失黑色耳机盒</h3><p>今天上午丢失，如有线索请联系发布者。</p></div>
        </RouterLink>
        <RouterLink class="story-card" to="/detail/groupBuy/1">
          <div class="story-copy"><span class="page-tag">拼单搭子</span><h3>周五晚上拼车去高铁站</h3><p>目前还差一人，成龙校区北门集合。</p></div>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-intro {
  margin-bottom: 40px;
  padding: 38px;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border: 1px solid var(--color-border-soft);
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgb(0 0 0 / 5%);
}

.home-intro h1 {
  margin: 0 0 10px;
  color: var(--color-ink);
  max-width: 670px;
  font-size: 38px;
  font-weight: 650;
}

.home-intro p {
  max-width: 720px;
  margin: 0;
  color: var(--color-muted);
  line-height: 1.8;
}

.publish-button {
  padding: 12px 22px;
  border: 1px solid var(--color-primary);
  border-radius: 999px;
  color: #ffffff;
  background: var(--color-primary);
  font-size: 14px;
  font-weight: 650;
}

.publish-button:hover {
  border-color: var(--color-primary-active);
  background: var(--color-primary-active);
  transform: translateY(-1px);
}

.hero-actions {
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.browse-button {
  padding: 12px 22px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-ink);
  background: var(--color-canvas);
  font-size: 14px;
  font-weight: 600;
}

.browse-button:hover {
  border-color: #b8b8b8;
  background: var(--color-page);
}

.hero-visual {
  position: relative;
  margin: 0;
  min-height: 300px;
  overflow: hidden;
  border-radius: 18px;
  background: var(--color-page);
}

.hero-visual img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
}

.hero-visual figcaption {
  position: absolute;
  right: 14px;
  bottom: 14px;
  padding: 7px 11px;
  border-radius: 999px;
  color: #ffffff;
  background: rgb(0 0 0 / 54%);
  font-size: 12px;
}

.section-heading { margin-bottom: 18px; display: flex; align-items: baseline; justify-content: space-between; gap: 18px; }
.section-heading .section-title { margin-bottom: 0; }
.section-heading > span,
.section-heading > a { color: var(--color-muted); font-size: 13px; }
.section-heading > a:hover { color: var(--color-primary-active); }

.business-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.business-card {
  min-height: 140px;
  padding: 22px;
  display: grid;
  align-content: start;
  gap: 16px;
  border: 1px solid var(--color-border-soft);
  border-radius: 16px;
  color: inherit;
  background: var(--color-card);
}

.business-card:hover {
  border-color: var(--color-border);
  box-shadow: 0 8px 24px rgb(0 0 0 / 6%);
  transform: translateY(-2px);
}

.business-copy,
.business-copy strong,
.business-copy > span {
  display: block;
}

.business-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: var(--color-page);
  font-size: 21px;
}

.business-card strong {
  color: var(--color-ink);
  font-size: 18px;
}

.business-copy > span {
  margin-top: 10px;
  color: var(--color-muted);
  font-size: 13px;
  line-height: 1.7;
}

.recommend-section {
  margin-top: 36px;
}

.story-card {
  min-height: 190px;
  overflow: hidden;
  border: 1px solid var(--color-border-soft);
  border-radius: 16px;
  background: #ffffff;
}

.story-card:hover { border-color: var(--color-border); box-shadow: 0 8px 24px rgb(0 0 0 / 6%); transform: translateY(-2px); }
.story-copy { padding: 24px; }
.story-copy .page-tag { margin-bottom: 10px; }
.story-copy h3 { margin: 0 0 8px; color: var(--color-ink); font-size: 17px; line-height: 1.45; }
.story-copy p { margin: 0; color: var(--color-muted); font-size: 13px; line-height: 1.7; }

@media (max-width: 700px) {
  .home-intro {
    padding: 28px;
    grid-template-columns: 1fr;
  }

  .home-intro h1 { font-size: 30px; }
  .hero-visual { min-height: 220px; }
}

@media (max-width: 900px) {
  .business-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .business-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .hero-actions a {
    text-align: center;
  }
}
</style>
