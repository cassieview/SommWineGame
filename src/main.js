import Vue from "vue";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

Vue.config.productionTip = false;

Vue.filter("toPercent", function(value) {
  value = parseInt(parseFloat(value) * 100);
  return value;
});

Vue.filter("toWineBottles", function(value) {
  value = Math.ceil(parseFloat(value) / 0.2);
  return value;
});

new Vue({
  render: h => h(App)
}).$mount("#app");
