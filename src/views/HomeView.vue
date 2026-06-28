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
  margin-bottom: 30px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border: 1px solid #dbe4f0;
  border-radius: 8px;
  background: #ffffff;
}

.home-intro h1 {
  margin: 0 0 10px;
  color: #111827;
  font-size: 32px;
}

.home-intro p {
  max-width: 720px;
  margin: 0;
  color: #6b7280;
  line-height: 1.8;
}

.publish-button {
  padding: 11px 18px;
  flex: none;
  border-radius: 5px;
  color: #ffffff;
  background: #2563eb;
  text-decoration: none;
}

.business-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.business-card {
  min-height: 132px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: inherit;
  background: #ffffff;
  text-decoration: none;
}

.business-card:hover {
  border-color: #93b4ee;
  box-shadow: 0 8px 22px rgb(37 99 235 / 8%);
}

.business-card strong,
.business-card span {
  display: block;
}

.business-card strong {
  color: #111827;
  font-size: 17px;
}

.business-card span {
  margin-top: 10px;
  color: #6b7280;
  font-size: 13px;
  line-height: 1.7;
}

.recommend-section {
  margin-top: 30px;
}

@media (max-width: 900px) {
  .business-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
