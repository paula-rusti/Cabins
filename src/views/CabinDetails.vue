<template>
  <v-container class="mt-4">
    <v-row style="margin-left: 15%; margin-right: 15%">
      <v-col cols="12">
        <div style="font-size: 25px; font-weight: bold; height: 50px">Seaside Villa Stockholm Archipelago</div>
        <div style="font-size: 20px; height: 50px">
          <v-icon icon="mdi-map-marker"></v-icon>
          <span class="mr-10">Vaxholm, Stockholm County, Sweden</span>
          <v-icon icon="mdi-star"></v-icon>
          5.0
        </div>
        <div style=" height: 50px">
          Photo Gallery
        </div>
        <v-row justify="center">
          <v-col class="center-content">
            <lightgallery
              :onBeforeSlide="onBeforeSlide"
              :onInit="onInit"
              :settings="lightGallerySettings2"
              class="light-gallery-style scroll-style-5"
            >
              <a v-for="(src, i) of images" :key="i" :href="src">
                <img :src="src" alt="img" class="img_style "/>
              </a>
            </lightgallery>
          </v-col>
        </v-row>
        <v-row class="pa-3">
          <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.</h3>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-card class="card-style">
              <v-card-item>
                <v-card-title>Cabin Info</v-card-title>
                <v-card-subtitle>Cabin's internal organization</v-card-subtitle>
              </v-card-item>

              <v-list
                :lines="false"
                density="compact"
                nav
                style="background-color: cornflowerblue"
              >
                <v-list-item
                  v-for="(item, i) in [{ title: 'Rooms', icon: 'mdi-sofa', value: 3 },
                                        { title: 'Bathrooms', icon: 'mdi-shower-head', value: 3 },
                                        { title: 'Beds', icon: 'mdi-bed', value: 3 },
                                        { title: 'Fits', icon: 'mdi-account', value: 3 }
                                      ]"
                  :key="i"
                  :value="item"
                  active-color="primary"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

                  <v-list-item-title
                    v-text="`${item.title}: ${item.value}`">
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card class="card-style">
              <v-card-item>
                <v-card-title>Facilities</v-card-title>
                <v-card-subtitle>What this place offers</v-card-subtitle>
              </v-card-item>
              <v-list
                :lines="false"
                density="compact"
                nav
              >
                <v-list-item
                  v-for="(item, i) in this.facilities.slice(0, this.facilitiesToShow)"
                  :key="i"
                  :value="item"
                  active-color="primary"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

                  <v-list-item-title v-text="item.text"></v-list-item-title>
                  <v-list-item-subtitle>aaa</v-list-item-subtitle>
                </v-list-item>
              </v-list>
              <v-card-actions>
                <v-btn @click="toggleFacilitiesButton">{{ this.facilitiesButtonText }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card>
              <v-card-title>Book Now!</v-card-title>
              <v-card-subtitle>At only ${{ this.cabin.price }} per night</v-card-subtitle>
              <v-card-actions>
                <v-row>
                  <v-col cols="12">
                    <v-card-item class="pa-0">
                      <Datepicker v-model="this.reserve_data.selected_dates" :clearable="true"
                                  :disabled-dates="this.reserve_data.disabled_dates"
                                  :enable-time-picker="false"
                                  :min-date="new Date()"
                                  :partial-range="false"
                                  no-disabled-range
                                  placeholder="Check In - Check Out"
                                  range
                                  style="width: 400px"
                                  @update:model-value="onDateUpdated">
                      </Datepicker>
                    </v-card-item>
                    <v-card-item class="pl-0">
                      <v-btn
                        append-icon="mdi-airplane-clock"
                        color="purple"
                        style="background-color: antiquewhite; width: 400px"
                        @click="onReservePressed"
                      >
                        Reserve
                      </v-btn>
                    </v-card-item>
                    <v-divider></v-divider>
                    <v-card-item>${{ this.cabin.price }} x {{ this.reserve_data.nights }} nights</v-card-item>
                    <v-card-item class="mt-0">Total Price: ${{ this.totalPrice }}</v-card-item>
                  </v-col>
                </v-row>

              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-divider style="margin-top: 30px; padding-bottom: 10px"></v-divider>
        <v-row>
          <v-col cols="7">
            <v-card variant="flat">
              <v-card-title style="font-size: 30px !important;">Host Information</v-card-title>
              <v-row style="margin-top: 10px">
                <v-col cols="1" style="margin-left: 20px">
                  <v-avatar
                    size="80px"
                  >
                    <v-img
                      alt="Avatar"
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    ></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="2">
                  <v-card-text style="font-size: 20px !important; padding-top: 0">Darth Vader</v-card-text>
                  <v-card-text class="pt-0" style="font-size: 15px !important;">Joined in July 2020</v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-row style="padding-top: 16px">
                    <v-icon icon="mdi-shield-check" style="margin-right: 10px;"></v-icon>
                    <div>Identity Verified</div>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="10">
                  <v-card-text style="font-size: 18px !important;">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and
                    scrambled it to make a type specimen book.
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="5">
            <v-card style="margin-top: 30px; margin-right: 60px" variant="tonal">
              <v-card-title style="font-size: 20px">Contact Information</v-card-title>
              <v-card-text style="font-size: 18px">Email: email@example.com</v-card-text>
              <v-card-text class="pt-0" style="font-size: 18px">Phone: 0736382028</v-card-text>
              <v-card-text class="pt-0" style="font-size: 18px">Facebook: Darth Vader</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-divider style="margin-top: 30px; padding-bottom: 10px"></v-divider>
        <v-row>
          <v-col cols="12">
            <p>
              <v-icon class="pr-5" icon="mdi-star" size="35px"></v-icon>
              <span class="pr-3 font-weight-bold">5.0</span>
              <span class="pr-2">10</span>
              <span>reviews</span>
            </p>

          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="i in 2" cols="6">
            <v-card>
              <v-list-item class="w-100 mt-5">
                <template v-slot:prepend>
                  <v-avatar
                    color="grey-darken-3"
                    image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-avatar>
                </template>
                <v-list-item-title>Evan You</v-list-item-title>
                <v-list-item-subtitle>5.0</v-list-item-subtitle>
              </v-list-item>
              <v-card-text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and
                scrambled it to make a type specimen book.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-footer class="d-flex flex-column">
    <div class="w-100 px-4"
         style="background-color: antiquewhite; height: 100px; display: flex; justify-content: center; align-items: center;">
      <strong>Get connected with us on social networks!</strong>

      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        size="small"
        variant="plain"
      ></v-btn>
    </div>

    <div class="px-4 py-2 w-100"
         style="background-color: floralwhite; height: 100px; display: flex; justify-content: center; align-items: center;">
      {{ new Date().getFullYear() }} — <strong>Cabins Inc.</strong>
    </div>
  </v-footer>
</template>

<script>
import {mapActions} from "pinia/dist/pinia";
import {useCabinsStore} from "@/store/cabins";
import ApiClient from "@/services/ApiClient";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Lightgallery from "lightgallery/vue";
import router from "@/router";

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: "CabinDetails",
  components: {Lightgallery, Datepicker},
  props: {
    url_slug: {
      type: String,
      required: true
    },
    cabin_id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isLoading: true,
      images2: [],
      cabin: {},
      reserve_data: {
        selected_dates: null,
        disabled_dates: [],
        nights: 0
      },
      lightGallerySettings2: {
        plugins: [lgThumbnail, lgZoom],
        speed: 500,
        thumbnail: true,
        allowMediaOverlap: true,
        toggleThumb: true,
        appendThumbnailsTo: '.lg-outer'
      },
      // data properties de cand am developat pagina pe home
      lightGallerySettings: {
        plugins: [lgThumbnail, lgZoom],
        speed: 500,
        thumbnail: true,
        allowMediaOverlap: true,
        toggleThumb: true,
        appendThumbnailsTo: '.lg-outer'
      },
      facilitiesButtonPressed: false,
      facilitiesButtonText: "Show More",
      facilities: [{text: 'Internet', icon: 'mdi-wifi', desc: 'free wifi is available'},
        {text: 'Parking', icon: 'mdi-parking', desc: 'free parking on site'},
        {text: 'Parking', icon: 'mdi-parking', desc: 'free parking on site'},
        {text: 'Parking', icon: 'mdi-parking', desc: 'free parking on site'},
        {text: 'Parking', icon: 'mdi-parking', desc: 'free parking on site'},
        {text: 'Parking', icon: 'mdi-parking', desc: 'free parking on site'},
      ],
      facilitiesToShow: 3,
      images: [
        "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      ],
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }
  },
  computed: {
    // a computed getter
    totalPrice() {
      // `this` points to the component instance
      return this.cabin.price * this.reserve_data.nights
    }
  },
  methods: {
    ...mapActions(useCabinsStore, ["getCabinById", "getPhotosOfCabin"]),
    onInit: () => {
      console.log('lightGallery has been initialized');
    },
    onBeforeSlide: () => {
      console.log('calling before slide');
    },
    onDateUpdated() {
      let startDate = this.reserve_data.selected_dates[0]
      let endDate = this.reserve_data.selected_dates[1]
      let diff = endDate.getTime() - startDate.getTime()
      this.reserve_data.nights = Math.ceil(diff / (1000 * 3600 * 24))
      console.log("nights: " + Math.ceil(diff / (1000 * 3600 * 24)))
    },
    onReservePressed() {
      if (this.reserve_data.selected_dates !== null) { // navigate only if date has been set
        console.log("navigating to reservation page")
        router.push({
          name: 'Reserve Page',
          params: {
            cabin_id: Number(this.cabin_id)
          }
        })
      }
    },
    toggleFacilitiesButton() {
      console.log("Handler called, initial value of pressed is: " + this.facilitiesButtonPressed)
      this.facilitiesButtonPressed = !this.facilitiesButtonPressed
      console.log("Handler called, modified value of pressed is: " + this.facilitiesButtonPressed)
      if (this.facilitiesButtonPressed === false) {
        this.facilitiesButtonText = "Show Less"
        this.facilitiesToShow = this.facilities.length
      } else {
        this.facilitiesButtonText = "Show More"
        this.facilitiesToShow = 3
      }
    }

  },
  async mounted() {
    console.log('fetching data')
    this.cabin = (await this.getCabinById(this.cabin_id)).Cabin // TODO verific ca raspunsul e 200 si ca exista Cabin
    this.images2 = await this.getPhotosOfCabin(this.cabin_id)
    this.images2 = this.images2.map(e => ApiClient.getPhotoUrl(e.id))
    console.log("done fetching" + this.cabin)
  }
}
</script>

<style lang="css">
@import 'lightgallery/css/lightgallery.css';
@import 'lightgallery/css/lg-thumbnail.css';
@import 'lightgallery/css/lg-zoom.css';

.img_style {
  margin: 10px;
  display: inline;
  height: 250px;
  width: 350px;
  border-radius: 10px;
}

.reserve-card-sticky {
  position: fixed !important;
  right: 10%;
}

.center-content {
  display: flex;
  justify-content: center;
}

.light-gallery-style {
  max-width: 1300px;
  max-height: 450px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.img_style {
  margin: 10px;
  display: inline;
  height: 200px;
  width: 200px;
  border-radius: 20px;
}

.card-style {
  background-color: aliceblue !important;
}

/*
 *  STYLE 5
 */

.scroll-style-5::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

.scroll-style-5::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5;
}

.scroll-style-5::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #555;
}

</style>
