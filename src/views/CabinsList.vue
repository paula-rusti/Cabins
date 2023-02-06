<template>
  <v-container class="my-2">
    <v-responsive>
      <v-row>
        <v-col cols="2">
          <p class="text-h5">SEARCH</p>
          <filter-cabins @filterChanged="this.onFilterChanged"></filter-cabins>
        </v-col>
        <v-col cols="8">

          <h1 v-if="loading">Loading
            <v-progress-linear
              color="green"
              indeterminate
            ></v-progress-linear>
          </h1>
          <div v-for="element in this.cabinsStore.cabins" v-if="!loading" class="pa-5">
            <cabin-card :description="element.description"
                        :location="element.location"
                        :name="element.name"
                        :price="element.price"
                        :src="element.src"/>
          </div>
        </v-col>
      </v-row>

      <v-snackbar
        v-model="snackbar.active"
        :timeout="snackbar.timeout"
        location="top"
      >
        {{ snackbar.text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-row align="center" justify="center">
        <v-col align="center" cols="12" justify="center">
          <div class="pa-5">
            <pagination-controls :current-page-start="this.cabinsStore.currentPage"
                                 :disable-next="isPaginationNextDisabled" @switchPage="onPageSwitched"/>
          </div>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>


</template>

<script>
import CabinCard from "@/components/CabinCard";
import {mapActions, mapStores} from "pinia/dist/pinia";
import {useCabinsStore} from "@/store/cabins";
import PaginationControls from "@/components/PaginationControls";
import FilterCabins from "@/components/FilterCabins";

export default {
  name: "CabinsList",
  components: {FilterCabins, PaginationControls, CabinCard},
  data() {
    return {
      loading: false,
      itemsPerPage: 3,
      totalCabins: undefined,
      snackbar: {
        active: false,
        text: 'My timeout is set to 2000.',
        timeout: 2000,
      }
    }
  },
  computed: {
    ...mapStores(useCabinsStore),
    isPaginationNextDisabled() {
      return this.cabinsStore.cabins.length === 0 || this.cabinsStore.currentPage > (this.totalCabins / this.itemsPerPage)
    }
  },
  methods: {
    // gives access to this.fetchCabins()
    ...mapActions(useCabinsStore, ['fetchCabins', 'setPage', 'setItemsPerPage', 'getCabinsCount'
      , 'setFilterList']),

    onPageSwitched(direction, currentPage) {
      console.log('page switch ', direction, currentPage)
      this.setPage(currentPage)   // set page in the store
      this.fetchCabinsData()      // use router function to get data from api
      // update query param page from router
    },
    async fetchCabinsData() {
      // fetch all the cabins
      this.loading = true;
      try {
        await this.fetchCabins()
      } catch (e) {
        this.snackbar.active = true
        this.snackbar.text = e.message
      } finally {
        this.loading = false;
      }
    },
    async onFilterChanged(values) {
      // fetch only the filtered cabins
      this.setFilterList(values)
      await this.fetchCabinsData()
    }
  },
  async mounted() {
    this.setItemsPerPage(this.itemsPerPage)
    await this.fetchCabinsData()
    this.totalCabins = await this.getCabinsCount()
    console.log(this.totalCabins)
  }
}
</script>

<style>
.pad {
  padding: 100px;
}
</style>
