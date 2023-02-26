// Utilities
import { defineStore } from "pinia";
import ApiClient from "@/services/ApiClient";

export const useCabinsStore = defineStore("cabins", {
  state: () => ({
    cabins: [],
    currentPage: 1,
    itemsPerPage: undefined, // set by cabinsList
    location_filter_list: [],
  }),
  actions: {
    async fetchCabins() {
      let finalRes = await ApiClient.fetchCabinsData({
        page: this.currentPage,
        size: this.itemsPerPage,
        location: this.location_filter_list,
      });

      for (let item of finalRes.items) {
        item.photos = await ApiClient.fetchPhotosOfCabin(item.id);
        if (item.photos.length !== 0) {
          item.src = `http://localhost:8000/photos/${item.photos[0].id}`;
        } else {
          item.src = "";
        }
      }
      this.cabins = finalRes.items || [];
      console.log("done fetching ", this.cabins, "on page ", this.currentPage);
    },

    async getCabinById(id) {
      // fetch
      return await ApiClient.fetchCabinById(id);
    },

    async getPhotosOfCabin(id) {
      return await ApiClient.fetchPhotosOfCabin(id);
    },

    setFilterList(values) {
      this.location_filter_list = values;
    },

    setPage(pageNr) {
      this.currentPage = pageNr;
    },

    setItemsPerPage(value) {
      this.itemsPerPage = value;
    },

    async getCabinsCount() {
      // get total count of cabins from api
      const apiURL = `http://localhost:8000/cabins/count`;
      const res = await fetch(apiURL);
      const finalRes = await res.json();
      return finalRes;
    },
  },
});
