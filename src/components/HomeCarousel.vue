<template>
  <v-carousel
    height="400"
    hide-delimiters
    progress="primary"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      :src="slide"
      cover
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "HomeCarousel",
  props: {
    slides: {
      type: Array,
      default: []
    }
  },
}
</script>

<style scoped>

</style>
