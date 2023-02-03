<template>
  <v-card
    class="mx-auto"
  >
    <v-container>
      <v-responsive>
        <v-row>
          <v-col cols="3">
            <v-img v-ripple="{ color: `text-primary` }"
                   :src=src
                   cover
                   style="border-radius: 50px;"
            >
            </v-img>
          </v-col>
          <v-col cols="5">
            <v-card-title class="align-content-right text-h5" href="https://www.stackoverflow.com">
              {{ name }}
            </v-card-title>
            <v-card-text>Description: {{ description }}</v-card-text>
            <v-card-text>Location: {{ location }}</v-card-text>
            <v-card-text>Price: {{ price }}</v-card-text>
          </v-col>
          <v-col cols="4">
            <v-card-actions>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn
                :to="{
                  name: 'Cabin Details',
                  params: {
                    url_slug: name,
                  },
                  query: {
                    start_date: '2020-12-01'
                  }
                }"
                color="purple lighten-2"
                text="Explore"
              ></v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>

  </v-card>
</template>

<script>
export default {
  name: "CabinCard",
  props: {
    name: {
      type: String,
      required: true  // required bcs the explore button's redirection has a param whose value is linked to the same property
    },
    description: {
      type: String,
      required: false
    },
    location: {
      type: String,
      required: false
    },
    price: {
      type: Number,
      required: false
    },
    src: {
      type: String,
      required: false
    },
  }
}
</script>

<style scoped>
.white-text {
  color: white;
}
</style>
