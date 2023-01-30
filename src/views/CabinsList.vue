<template>
  <v-container class="my-2">
    <v-responsive>
      <v-row>
        <v-col cols="2">
          <p class="text-h5">SEARCH</p>
          <filter-cabins @filterChanged="this.onFilterChanged"></filter-cabins>
        </v-col>
        <v-col cols="8">
          <pagination-controls :current-page-start="this.cabinsStore.currentPage"
                               :disable-next="isPaginationNextDisabled" @switchPage="onPageSwitched"/>
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
                        :src="element.photos[0]"
                        shortDescription="Come here for a quick relax"/>
          </div>
        </v-col>
        <!--        <v-col cols="3">-->
        <!--          <p class="text-h5">EMPTY space</p>-->
        <!--        </v-col>-->
      </v-row>
      <!--   pagination controls   -->
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
    ...mapActions(useCabinsStore, ['fetchCabins', 'setPage', 'setItemsPerPage', 'filterCabins', 'getCabinsCount'
      , 'setFilterList']),

    onPageSwitched(direction, currentPage) {
      console.log('page switch ', direction, currentPage)
      this.setPage(currentPage)
      this.fetchCabinsData()
      // update query param page from router
    },
    async fetchCabinsData() {
      // fetch all the cabins
      this.loading = true;
      try {
        await this.fetchCabins()
      } finally {
        this.loading = false;
      }
    },
    async onFilterChanged(values) {
      // fetch only the filtered cabins
      this.setFilterList(values)
      await this.filterCabins(values)
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
