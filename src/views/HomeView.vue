<template>
  <main class="page">
    <section class="home-intro">
      <div class="hero-copy">
        <span class="page-tag">校园生活信息服务</span>
        <h1>校园轻集市</h1>
        <p>欢迎来到校园轻集市，在这里浏览二手商品、查找失物、寻找拼单搭子或发布跑腿委托。</p>
        <div class="hero-actions">
          <RouterLink class="publish-button" to="/publish">去发布</RouterLink>
          <RouterLink class="browse-button" to="/trade">浏览集市</RouterLink>
        </div>
      </div>
      <div class="hero-note" aria-hidden="true">
        <strong>校内真实需求</strong>
        <span>让闲置流动，让互助更简单</span>
      </div>
    </section>

    <section>
      <h2 class="section-title">核心业务</h2>
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
      <h2 class="section-title">推荐信息</h2>
      <div class="card-grid">
        <article class="skeleton-card">
          <span class="page-tag">二手交易</span>
          <h3>出闲置教材《软件工程导论》</h3>
          <p>九成新，东区宿舍可当面查看。</p>
        </article>
        <article class="skeleton-card">
          <span class="page-tag">失物招领</span>
          <h3>西门附近丢失黑色耳机盒</h3>
          <p>今天上午丢失，如有线索请联系发布者。</p>
        </article>
        <article class="skeleton-card">
          <span class="page-tag">拼单搭子</span>
          <h3>周五晚上拼车去高铁站</h3>
          <p>目前还差一人，学校北门集合。</p>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-intro {
  margin-bottom: 40px;
  padding: 38px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border: 1px solid var(--color-border-soft);
  border-radius: 20px;
  background: var(--color-canvas);
  box-shadow: 0 8px 24px rgb(0 0 0 / 5%);
}

.home-intro h1 {
  margin: 0 0 10px;
  color: var(--color-ink);
  font-size: 36px;
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

.hero-note {
  min-width: 250px;
  padding: 22px;
  display: grid;
  gap: 7px;
  border-radius: 16px;
  color: var(--color-body);
  background: #fff6f7;
}

.hero-note strong {
  font-size: 17px;
}

.hero-note span {
  color: var(--color-muted);
  font-size: 13px;
}

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

@media (max-width: 700px) {
  .home-intro {
    padding: 28px;
    align-items: flex-start;
    flex-direction: column;
  }

  .hero-note {
    width: 100%;
    min-width: 0;
  }
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
