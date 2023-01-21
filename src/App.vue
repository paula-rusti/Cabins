<template>
  <main>
    <v-app>
      <navigation-bar/>
      <router-view class="router-margin"/>
    </v-app>
  </main>
</template>

<script>
//
import NavigationBar from "@/components/NavigationBar";

export default {
  name: "App",
  components: {NavigationBar},
  mounted() {
  }
}
</script>

<style scoped>
.router-margin {
  margin-top: 65px;
}
</style>
