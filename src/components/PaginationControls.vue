<template>
  <div class="pa-3">
    <v-btn :disabled="isPrevDisabled" class="mx-2" @click="onSwitchPage(-1)">
      <v-icon
        class="ma-2"
        color="purple"
        icon="mdi-arrow-left"
        start
      ></v-icon>
    </v-btn>

    <v-btn :disabled="disableNext" class="mx-2" @click="onSwitchPage(1)">
      <v-icon
        class="ma-2"
        color="purple"
        icon="mdi-arrow-right"
        start
      ></v-icon>
    </v-btn>

    <v-chip class="mx-2" style="font-weight: bold">
      {{ currentPage }}
    </v-chip>
  </div>
</template>

<script>

export default {
  name: "PaginationControls",
  emits: ['switchPage'],
  props: {
    currentPageStart: {
      type: Number,
      default: 1
    },
    disableNext: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    currentPageStart(value) {
      this.currentPage = value
    }
  },
  data() {
    return {
      currentPage: this.currentPageStart
    }
  },
  computed: {
    isPrevDisabled() {
      return this.currentPage <= 1
    }
  },
  methods: {
    onSwitchPage(direction) {
      this.currentPage += direction
      this.$emit('switchPage', direction, this.currentPage)
    }
  },
}
</script>

<style scoped>

</style>
