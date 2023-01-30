// Utilities
import {defineStore} from 'pinia'

export const useCabinsStore = defineStore('cabins', {
  state: () => ({
    cabins: [],
    currentPage: 1,
    itemsPerPage: undefined,   // set by cabinsList
    location_filter_list: []
  }),
  actions: {
    async fetchCabins() {
      console.log(`items per page ${this.itemsPerPage}`)
      const jsonServerURL = `http://localhost:3000/cabins?_page=${this.currentPage}&_limit=${this.itemsPerPage}`
      const apiURL = `http://localhost:8000/cabins?page=${this.currentPage}&size=${this.itemsPerPage}`
      // apply filters
      const res = await fetch(apiURL);
      const finalRes = await res.json();
      this.cabins = finalRes.items || [];
      console.log('done fetching ', this.cabins, 'on page ', this.currentPage)
    },

    setFilterList(values) {
      this.location_filter_list = values
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
    },

    async getCabinsCount() {
      // get total count of cabins from api
      const apiURL = `http://localhost:8000/cabins/total`
      const res = await fetch(apiURL);
      const finalRes = await res.json();
      return finalRes
    }
  },
})
