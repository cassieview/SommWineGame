import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.filter("toPercent", function(value) {
  value = parseInt(parseFloat(value) * 100);
  return value;
});

new Vue({
  render: h => h(App)
}).$mount("#app");
