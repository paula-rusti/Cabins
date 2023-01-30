<template>
  <h1>Test Api client</h1>
  <v-btn @click="onFetchCabins({page: 1, size: 2})">Fetch Cabins</v-btn>
  <br/>
  <br/>
  <v-btn @click="onFetchCabins({page: 1, size: 2, location: ['Cluj', 'Maramures']})">Fetch Cabins From Cluj</v-btn>
</template>

<script>
import ApiClient from "@/services/ApiClient";

export default {
  name: "ApiClientTest",
  methods: {
    async onFetchCabins(params) {
      let cabins = await ApiClient.fetchCabins(params)
      console.log("cabins are: ", cabins)
    }
  }
}
</script>

<style scoped>

</style>
