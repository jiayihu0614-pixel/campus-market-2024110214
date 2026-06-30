<template>
  <main class="page">
    <section class="home-intro">
      <div>
        <span class="page-tag">校园生活信息服务</span>
        <h1>首页</h1>
        <p>欢迎来到校园轻集市，在这里浏览二手商品、查找失物、寻找拼单搭子或发布跑腿委托。</p>
      </div>
      <RouterLink class="publish-button" to="/publish">发布信息</RouterLink>
    </section>

    <section>
      <h2 class="section-title">核心业务</h2>
      <div class="business-grid">
        <RouterLink class="business-card" to="/trade">
          <strong>二手交易</strong>
          <span>发现校园内的教材、数码和生活闲置。</span>
        </RouterLink>
        <RouterLink class="business-card" to="/lost-found">
          <strong>失物招领</strong>
          <span>发布失物或拾物信息，帮助物品回到主人身边。</span>
        </RouterLink>
        <RouterLink class="business-card" to="/group-buy">
          <strong>拼单搭子</strong>
          <span>寻找拼餐、拼车、学习和活动伙伴。</span>
        </RouterLink>
        <RouterLink class="business-card" to="/errand">
          <strong>跑腿委托</strong>
          <span>发布或承接校内取件、代买和送达任务。</span>
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
  margin-bottom: 34px;
  padding: 34px 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border: 1px solid #dbe4f0;
  border-left: 4px solid #2563eb;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 8px 28px rgb(23 32 51 / 6%);
}

.home-intro h1 {
  margin: 0 0 10px;
  color: #172033;
  font-size: 34px;
}

.home-intro p {
  max-width: 720px;
  margin: 0;
  color: #64748b;
  line-height: 1.8;
}

.publish-button {
  padding: 12px 20px;
  flex: none;
  border-radius: 6px;
  color: #ffffff;
  background: #2563eb;
  box-shadow: 0 7px 16px rgb(37 99 235 / 20%);
  text-decoration: none;
}

.publish-button:hover {
  background: #1d4ed8;
  box-shadow: 0 9px 20px rgb(37 99 235 / 24%);
  transform: translateY(-1px);
}

.business-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.business-card {
  min-height: 140px;
  padding: 22px;
  border: 1px solid #dfe5ee;
  border-top: 3px solid #3b82f6;
  border-radius: 8px;
  color: inherit;
  background: #ffffff;
  box-shadow: 0 5px 18px rgb(23 32 51 / 4%);
  text-decoration: none;
}

.business-card:nth-child(2) {
  border-top-color: #10b981;
}

.business-card:nth-child(3) {
  border-top-color: #f59e0b;
}

.business-card:nth-child(4) {
  border-top-color: #f43f5e;
}

.business-card:hover {
  border-color: #93b4ee;
  border-top-color: #2563eb;
  box-shadow: 0 12px 28px rgb(23 32 51 / 9%);
  transform: translateY(-3px);
}

.business-card strong,
.business-card span {
  display: block;
}

.business-card strong {
  color: #172033;
  font-size: 18px;
}

.business-card span {
  margin-top: 10px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.7;
}

.recommend-section {
  margin-top: 36px;
}

@media (max-width: 700px) {
  .home-intro {
    padding: 26px;
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 520px) {
  .business-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .business-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
