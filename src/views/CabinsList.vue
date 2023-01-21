<template>
  <v-container class="my-2">
    <v-responsive>
      <v-row>
        <v-col cols="4">
          <p class="text-h5">SEARCH</p>
        </v-col>
        <v-col cols="5">
          <div v-for="src in this.pics" class="pa-5">
            <cabin-card :src="src"
                        description="Description"
                        name="Cabana Merelor"
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

export default {
  name: "CabinsList",
  components: {CabinCard},
  data() {
    return {
      pics: [
        "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        "https://cdn.vuetifyjs.com/images/cards/hotel.jpg",
        "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      ]
    }
  }
}
</script>

<style>
.pad {
  padding: 100px;
}
</style>
