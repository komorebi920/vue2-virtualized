import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const COMPONENT_EXAMPLES_MAP = {
  "/components/AutoSizer": () =>
    import(
      /* webpackChunkName: "AutoSizerExample" */ "../AutoSizer/AutoSizer.example"
    ),
  "/components/Grid": () =>
    import(/* webpackChunkName: "GridExample" */ "../Grid/Grid.example"),
  "/components/InfiniteLoader": () =>
    import(
      /* webpackChunkName: "InfiniteLoaderExample" */ "../InfiniteLoader/InfiniteLoader.example"
    ),
  "/components/List": () =>
    import(/* webpackChunkName: "ListExample" */ "../List/List.example"),
};

const routes = [
  {
    path: "/",
    redirect: "/components/list",
  },
];

const componentExampleRoutes = Object.keys(COMPONENT_EXAMPLES_MAP).map(
  (route) => ({
    path: route,
    component: COMPONENT_EXAMPLES_MAP[route],
  }),
);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes.concat(componentExampleRoutes),
});

export default router;
