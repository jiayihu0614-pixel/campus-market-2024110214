import { defineStore } from 'pinia'

const STORAGE_KEY = 'campus-market-current-user'

export interface CurrentUser {
  id: number
  username: string
  name: string
  college: string
  grade: string
  campus: string
  avatar: string
  bio: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    currentUser: null as CurrentUser | null,
  }),

  getters: {
    displayName: (state) => state.currentUser?.name ?? '游客',
    userDescription: (state) => {
      if (!state.currentUser) return '尚未登录'
      return `${state.currentUser.college} · ${state.currentUser.grade}`
    },
  },

  actions: {
    updateProfile(payload: Partial<CurrentUser>) {
      if (!this.currentUser) return

      this.currentUser = {
        ...this.currentUser,
        ...payload,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.currentUser))
    },

    login(user: CurrentUser) {
      this.currentUser = user
      this.isLoggedIn = true
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    },

    logout() {
      this.currentUser = null
      this.isLoggedIn = false
      localStorage.removeItem(STORAGE_KEY)
    },

    restoreLogin() {
      const savedUser = localStorage.getItem(STORAGE_KEY)

      if (!savedUser) return

      try {
        this.currentUser = JSON.parse(savedUser) as CurrentUser
        this.isLoggedIn = true
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    },
  },
})
