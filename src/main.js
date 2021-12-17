import Vue from 'vue'
import App from './App.vue'
import vuetify from "@/plugins/vuetify";
//import "vuetify/dist/vuetify.min.css";
import router from "./router";
import axios from "axios";

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$api = "https://laravel.onmart-paw.xyz/api";
// Vue.prototype.$api = "http://localhost:8000/api";

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
