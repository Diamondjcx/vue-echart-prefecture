import Vue from 'vue'
import App from './App.vue'
import Map from '../packages/index'

Vue.use(Map)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')