// Composables
import { createRouter, createWebHistory } from "vue-router";
import DefaultView from "@/layouts/default/Default.vue";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    component: DefaultView,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "cabins",
        name: "Cabins List",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/CabinsList.vue"),
      },
      {
        path: "cabins/:cabin_id-:url_slug/",
        name: "Cabin Details",
        props: true,
        component: () => import("@/views/CabinDetails.vue"),
      },
      {
        path: "cabins/reserve/:cabin_id",
        name: "Reserve Page",
        props: true,
        component: () => import("@/views/ReservePage.vue"),
      },
      {
        path: "testApiClient",
        name: "Api Client Test",
        props: true,
        component: () => import("@/views/ApiClientTest.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
