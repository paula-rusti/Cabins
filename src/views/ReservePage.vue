<template>
  <h1>Book Now</h1>
  <h1>Cabin with id {{ cabin_id }}</h1>
</template>

<script>
export default {
  name: "ReservePage",
  props: {
    cabin_id: {
      type: Number,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
