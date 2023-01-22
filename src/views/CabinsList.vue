<template>
  <v-container class="my-2">
    <v-responsive>
      <v-row>
        <v-col cols="4">
          <p class="text-h5">SEARCH</p>
        </v-col>
        <v-col cols="5">
          <h1 v-if="loading">Loading
            <v-img height="200px" src="@/assets/Hourglass.gif" width="200px"></v-img>
          </h1>
          <div v-for="element in this.cabinsStore.cabins" v-if="!loading" class="pa-5">
            <cabin-card :description="element.description"
                        :name="element.title"
                        :src="element.pictures[0]"
                        shortDescription="Come here for a quick relax"/>
          </div>
        </v-col>
        <v-col cols="3">
          <p class="text-h5">EMPTY space</p>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>

</template>

<script>
import CabinCard from "@/components/CabinCard";
import {mapActions, mapStores} from "pinia/dist/pinia";
import {useCabinsStore} from "@/store/cabins";

export default {
  name: "CabinsList",
  components: {CabinCard},
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapStores(useCabinsStore),
  },
  methods: {
    // gives access to this.fetchCabins()
    ...mapActions(useCabinsStore, ['fetchCabins']),
  },
  async mounted() {
    this.loading = true;
    try {
      await this.fetchCabins()
    } finally {
      this.loading = false;
    }

  }
}
</script>

<style>
.pad {
  padding: 100px;
}
</style>
