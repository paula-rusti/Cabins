<template>
  <h1>Hello {{ url_slug }}</h1>

</template>

<script>
export default {
  name: "CabinDetails",
  props: {
    url_slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    console.log('fetching data')
  }
}
</script>

<style scoped>

</style>
