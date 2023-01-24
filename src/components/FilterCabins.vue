<template>
  <v-autocomplete
    v-model="values"
    :items="items"
    chips
    dense
    label="Outlined"
    multiple
    outlined
    small-chips
    @update:modelValue="onChanged"
  ></v-autocomplete>
</template>

<script>
export default {
  name: "FilterCabins",
  emits: ['filterChanged'],
  data() {
    return {
      items: ['Arad', 'Alba', 'Cluj', 'Maramures', 'Dolj', 'Iasi'],
      values: [],
      value: null,
    }
  },
  methods: {
    onChanged() {
      console.log('input changed')
      this.$emit('filterChanged', this.values)
    },
  }
}
</script>

<style scoped>

</style>
