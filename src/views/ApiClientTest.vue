<template>
  <h1>Test Api client</h1>
  <v-btn @click="onFetchCabins({page: 1, size: 2})">Fetch Cabins</v-btn>
  <br/>
  <br/>
  <v-btn @click="onFetchCabins({skip: 0, limit: 100, start_date: '2023-03-01', end_date: '2023-03-09'})">Fetch Cabins
    From
    Cluj
  </v-btn>
  <v-alert v-if="errorFetching"
           border="right"
           colored-border
           elevation="2"
           type="error"
  >
    {{ errorMessage }}
  </v-alert>
</template>

<script>
import ApiClient from "@/services/ApiClient";

export default {
  name: "ApiClientTest",
  data() {
    return {
      errorFetching: false,
      errorMessage: ""
    }
  },
  methods: {
    async onFetchCabins(params) {
      try {
        let cabins = await ApiClient.fetchCabins(params, true)
        console.log("cabins are: ", cabins)
      } catch (e) {
        this.errorFetching = true
        this.errorMessage = e.message
      }
    }
  }
}
</script>

<style scoped>

</style>
