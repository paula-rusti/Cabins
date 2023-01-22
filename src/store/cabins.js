// Utilities
import {defineStore} from 'pinia'

export const useCabinsStore = defineStore('cabins', {
  state: () => ({
    cabins: [],
    currentPage: 1,
    itemsPerPage: 5   // should normally be computed by knowing the value of total cabins from the api
  }),
  actions: {
    async fetchCabins() {
      const res = await fetch(`http://localhost:3000/cabins?_page=${this.currentPage}&_limit=${this.itemsPerPage}`);
      const finalRes = await res.json();
      this.cabins = finalRes;
      console.log('done fetching ', this.cabins, 'on page ', this.currentPage)
    },

    setPage(pageNr) {
      this.currentPage = pageNr
    }
  },
})
