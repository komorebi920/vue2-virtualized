// IE 10+ compatibility for demo (must come before other imports)
// import '@babel/polyfill';

// Import react-virtualized styles as part of bootstrap process
import "../styles.scss";

import Vue from "vue";
import router from "../router";

import Application from "./Application";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(Application),
}).$mount("#root");

// Import and attach the favicon
document.querySelector('[rel="shortcut icon"]').href = require("./favicon.png");
