<template>
  <v-container class="my-9">
    <v-responsive>
      <v-row>
        <v-col cols="12">
          <home-carousel :slides="homePics"/>
          <debug-logged-in class="mt-15"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <div id="search-area">
            <h1>Search</h1>
          </div>
        </v-col>
        <v-col cols="10">
          <div class="d-flex flex-column">
            <v-flex v-for="index in 4" :key="index" class="mx-6 my-6">
              <cabin-card name="dummy value"></cabin-card>
            </v-flex>
          </div>
        </v-col>
      </v-row>
    </v-responsive>

  </v-container>

</template>

<script>
import HomeCarousel from "@/components/HomeCarousel";
import DebugLoggedIn from "@/components/DebugLoggedIn";
import CabinCard from "@/components/CabinCard";

export default {
  name: "Home",
  components: {DebugLoggedIn, HomeCarousel, CabinCard},
  data() {
    return {
      homePics: [
        "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        "https://cdn.vuetifyjs.com/images/cards/hotel.jpg",
        "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      ]
    }
  }
}
</script>

<style scoped>
#search-area {
  background-color: red;
}
</style>
