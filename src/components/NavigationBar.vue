<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>
      Cabins Inc.
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <div v-if="!userStore.isLoggedIn">
      <v-btn
        color="primary"
        prepend-icon="mdi-account-plus"
        variant="elevated"
      >
        Register
      </v-btn>

      <v-btn
        class="mx-6"
        color="secondary"
        prepend-icon="mdi-account-arrow-right"
        variant="outlined"
        @click="userStore.login"
      >
        Login
      </v-btn>

      <v-btn
        color="purple"
        prepend-icon="mdi-home-account"
        style="margin-right: 24px"
        variant="outlined"
        @click="userStore.login"
      >
        Owner?
      </v-btn>

    </div>
    <v-btn
      v-if="userStore.isLoggedIn"
      class="mx-6"
      color="secondary"
      prepend-icon="mdi-account-arrow-right"
      variant="outlined"
    >
      DEBUG LOGGED IN

    </v-btn>
  </v-app-bar>
</template>

<script>

import {useUserStore} from "@/store/user";
import {mapActions, mapStores} from "pinia/dist/pinia";

export default {
  name: "NavigationBar",
  data() {
    return {
      isLoggedIn: this.isLoggedIn
    }
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    // gives access to this.increment()
    ...mapActions(useUserStore, ['login']),
  },
  mounted() {
    // API CALL TO GET DATA
    // this.userStore.login();
  }
}
</script>

<style scoped>

</style>
