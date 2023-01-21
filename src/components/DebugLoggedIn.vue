<template>
  <div>
    <h1 v-if="userStore.isLoggedIn">User is logged in</h1>
    <h1 v-if="!userStore.isLoggedIn">User is not logged in</h1>
  </div>
</template>

<script>
import {mapActions, mapStores} from "pinia/dist/pinia";
import {useUserStore} from "@/store/user";

export default {
  name: "DebugLoggedIn",
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    // gives access to this.increment()
    ...mapActions(useUserStore, ['login']),
  },
}
</script>

<style scoped>

</style>
