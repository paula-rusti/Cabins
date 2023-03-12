// Utilities
import { defineStore } from "pinia";
import ApiClient from "@/services/ApiClient";
import va from "@vuepic/vue-datepicker";

export const useCabinsStore = defineStore("cabins", {
  state: () => ({
    cabins: [],
    currentPage: 1,
    itemsPerPage: 0, // set by cabinsList
    search_params: {
      start_date: null,
      end_date: null,
      location: null,
      capacity: null, // TODO add parameters for facilities and rating filters
    },
  }),
  actions: {
    async retrieveCabins(search = false) {
      let fetchCabinsParams = {
        page: this.currentPage,
        size: this.itemsPerPage,
      };
      if (search) {
        fetchCabinsParams = {
          ...fetchCabinsParams,
          ...this.search_params,
        };
      }
      let finalRes = await ApiClient.fetchCabins(fetchCabinsParams, search);

      for (let item of finalRes.items) {
        item.photos = await ApiClient.fetchPhotosOfCabin(item.id);
        if (item.photos.length !== 0 && item.photos.length !== undefined) {
          item.src = `http://localhost:8000/photos/${item.photos[0].id}`;
        } else {
          item.src =
            "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
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

    // functions to update search parameters

    setSearchParams(value) {
      // value will be a dict of type: {search_param_key: search_param_value}
      // this.search_params = { ...this.search_params, ...value };
      this.search_params = Object.assign({}, this.search_params, value);
      console.log(
        "in cabins store: updated search params to: " +
          JSON.stringify(this.search_params)
      );
    },
  },
});
