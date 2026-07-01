import { defineStore } from 'pinia'

export type FavoriteType = 'trade' | 'lostFound' | 'groupBuy' | 'errand'

export interface FavoriteItem {
  id: number | string
  type: FavoriteType
  title: string
  description: string
  location?: string
  time?: string
  publisher?: string
  status?: string
  price?: string | number
  tag?: string
}

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: [] as FavoriteItem[],
  }),

  getters: {
    favoriteCount: (state) => state.favorites.length,
  },

  actions: {
    isFavorite(type: FavoriteType, id: number | string) {
      return this.favorites.some((item) => item.type === type && item.id === id)
    },

    addFavorite(item: FavoriteItem) {
      if (!this.isFavorite(item.type, item.id)) {
        this.favorites.push(item)
      }
    },

    removeFavorite(type: FavoriteType, id: number | string) {
      this.favorites = this.favorites.filter((item) => {
        return !(item.type === type && item.id === id)
      })
    },

    toggleFavorite(item: FavoriteItem) {
      if (this.isFavorite(item.type, item.id)) {
        this.removeFavorite(item.type, item.id)
      } else {
        this.addFavorite(item)
      }
    },
  },
})
