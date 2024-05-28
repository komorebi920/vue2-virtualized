import Vue from "vue";
import VueRouter from "vue-router";
import AutoSizerExample from "../AutoSizer/AutoSizer.example";
import GridExample from "../Grid/Grid.example";
import ListExample from "../List/List.example";

Vue.use(VueRouter);

const COMPONENT_EXAMPLES_MAP = {
  "/components/AutoSizer": AutoSizerExample,
  "/components/Grid": GridExample,
  "/components/List": ListExample,
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
