import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import $ from 'jquery'

Vue.use(BootstrapVue); // for use boostrap 

/* eslint-disable */
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
