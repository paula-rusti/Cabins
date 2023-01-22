// Utilities
import {defineStore} from 'pinia'

export const useCabinsStore = defineStore('cabins', {
  state: () => ({
    cabins: []
  }),
  actions: {
    async fetchCabins() {
      const res = await fetch("http://localhost:3000/cabins");
      const finalRes = await res.json();
      this.cabins = finalRes;
      console.log('done fetching ', this.cabins)
    }
  },
})
