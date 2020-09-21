import Vue from 'vue'
import App from './App.vue'
import Prefecture from '../packages/index'
import Provincial from '../packages/index'
import '../packages/utils/city.js'

Vue.use(Provincial)
Vue.use(Prefecture)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')