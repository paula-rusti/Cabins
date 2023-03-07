<template>
  <v-container class="my-2">
    <v-responsive>
      <v-row>
        <v-col class="ma-2 v-col-md-3 v-col-lg-2 v-col-xl-2" cols="3">
          <p class="text-h5">SEARCH</p>
          <filter-cabins @filterChanged="this.onFilterChanged"></filter-cabins>
          <v-card color="pink">
            <v-card-title class="pb-5">SEARCH</v-card-title>
            <v-card-actions>
              <v-row>
                <v-col class="py-0" cols="12">
                  <v-text-field bg-color="white" class="mx-auto" label="Country/City/Property name"
                                prepend-inner-icon="mdi-magnify"></v-text-field>
                </v-col>
                <v-col class="py-0 pb-5" cols="12">
                  <Datepicker v-model="this.search.dates"
                              :clearable="true"
                              :enable-time-picker="false"
                              :min-date="new Date()"
                              class="mx-auto"
                              no-disabled-range
                              placeholder="Check In - Check Out"
                              range>

                  </Datepicker>
                </v-col>
                <v-col class="py-0" cols="12">
                  <v-text-field bg-color="white" class=" mx-auto" label="Number of Guests"
                                prepend-inner-icon="mdi-magnify">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn block class="bg-white py-0 mx-auto">SEARCH</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
          <v-card class="mt-5">
            <v-card-title>Filter By</v-card-title>
            <v-list class="overflow-hidden">
              <v-list-subheader>AVAILABLE FACILITIES</v-list-subheader>

              <v-list-item
                v-for="(item, i) in ['Spa', 'Indoor Pool', 'Candy Bar']"
                :key="i"
                :value="item"
                active-color="primary"
                height="50"
                rounded="xl"
              >
                <template v-slot:prepend>
                  <v-checkbox :label="item"></v-checkbox>
                </template>
              </v-list-item>

              <v-list-subheader class="mt-4">STAR RATING</v-list-subheader>

              <v-list-item
                v-for="(item, i) in ['1 star', '2 stars', '3 stars', '4 stars', '5 stars', 'Unrated']"
                :key="i"
                :ripple=false
                :value="item"
                active-color="primary"
                height="50"
                rounded="xl"
              >
                <v-list-item-title>
                  <v-checkbox :label=item></v-checkbox>
                </v-list-item-title>
              </v-list-item>
            </v-list>

          </v-card>
        </v-col>


        <v-col cols="8">
          <h1 v-if="loading">Loading
            <v-progress-linear
              color="green"
              indeterminate
            ></v-progress-linear>
          </h1>
          <div v-for="element in this.cabinsStore.cabins" v-if="!loading" class="pa-5">
            <cabin-card :id="Number(element.id)"
                        :description="element.description"
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

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: "CabinsList",
  components: {FilterCabins, PaginationControls, CabinCard, Datepicker},
  data() {
    return {
      loading: false,
      itemsPerPage: 3,
      totalCabins: undefined,
      snackbar: {
        active: false,
        text: 'My timeout is set to 2000.',
        timeout: 2000,
      },
      search: {
        dates: {}
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
/* used by datepicker input */
.dp__input {
  height: 54px;
}
</style>
