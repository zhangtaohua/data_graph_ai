import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "AppEnter",
    redirect: "/demo",
  },
  {
    path: "/demo",
    name: "CesiumDemo",
    component: () => import("@/views/cesium/index.vue"),
  },
  {
    path: "/threenav",
    name: "ThreeNavigation",
    component: () => import("@/views/three/index.vue"),
  },
  // pathMatch is the name of the param, e.g., going to /not/found yields
  // { params: { pathMatch: ['not', 'found'] }}
  // this is thanks to the last *, meaning repeated params and it is necessary if you
  // plan on directly navigating to the not-found route using its name
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: "/cesium",
  },
  // if you omit the last `*`, the `/` character in params will be encoded when resolving or pushing
  {
    path: "/:pathMatch(.*)",
    name: "bad-not-found",
    redirect: "/cesium",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
