import { defineStore } from 'pinia'

export interface JoinedActivity {
  id: number
  type: 'groupBuy'
  title: string
  category: string
  location: string
  deadline: string
  publisher: string
  joinedAt: string
}

export const useActivityStore = defineStore('activity', {
  state: () => ({
    userId: null as number | null,
    joinedActivities: [] as JoinedActivity[],
  }),

  getters: {
    joinedCount: (state) => state.joinedActivities.length,
    recentActivities: (state) => {
      return [...state.joinedActivities].sort(
        (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime(),
      )
    },
  },

  actions: {
    storageKey(userId: number) {
      return `campus-market-activities-${userId}`
    },

    loadForUser(userId: number) {
      this.userId = userId
      const saved = localStorage.getItem(this.storageKey(userId))
      if (!saved) {
        this.joinedActivities = []
        return
      }

      try {
        this.joinedActivities = JSON.parse(saved) as JoinedActivity[]
      } catch {
        this.joinedActivities = []
        localStorage.removeItem(this.storageKey(userId))
      }
    },

    addJoinedActivity(activity: JoinedActivity) {
      if (!this.userId) return
      const exists = this.joinedActivities.some((item) => item.id === activity.id)
      if (!exists) this.joinedActivities.push(activity)
      localStorage.setItem(this.storageKey(this.userId), JSON.stringify(this.joinedActivities))
    },
  },
})
