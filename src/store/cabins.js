// Utilities
import {defineStore} from 'pinia'

export const useCabinsStore = defineStore('cabins', {
  state: () => ({
    cabins: [],
    currentPage: 1,
    itemsPerPage: undefined   // set by cabinsList
  }),
  actions: {
    async fetchCabins() {
      const jsonServerURL = `http://localhost:3000/cabins?_page=${this.currentPage}&_limit=${this.itemsPerPage}`
      const apiURL = `http://localhost:8000/cabins?page=${this.currentPage}&size=${this.itemsPerPage}`
      const res = await fetch(apiURL);
      const finalRes = await res.json();
      this.cabins = finalRes.items || [];
      console.log('done fetching ', this.cabins, 'on page ', this.currentPage)
    },

    setPage(pageNr) {
      this.currentPage = pageNr
    },

    setItemsPerPage(value) {
      this.itemsPerPage = value
    },

    async filterCabins(values) {
      console.log('filtering cabins by the following values: ' + values)
      let filterUrl = `http://localhost:3000/cabins?`
      for (let loc in values) {
        filterUrl += `location=${values[loc]}&`
      }
      const res = await fetch(filterUrl);
      this.cabins = await res.json();
    }
  },
})
