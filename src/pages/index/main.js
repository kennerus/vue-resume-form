import Vue from 'vue';
import App from './App.vue';
import "vue-mdc-adapter/dist/vue-mdc-adapter.css";
import VueMDCAdapter from "vue-mdc-adapter";
import vSelect from 'vue-select';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false;

Vue.use(VueMDCAdapter);
Vue.component('v-select', vSelect)
Vue.use(VueSweetalert2, {
  confirmButtonColor: '#6200ee'
});


new Vue({
  el: '#app',
  render: h => h(App),
});