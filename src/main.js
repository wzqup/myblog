import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from "./store/index"

import 'animate.css'
import '@/style/index.scss'
import '@/utils/rem.js'

import golbal from "./utils/global"
Vue.use(golbal)

Vue.config.productionTip = false
const vm = new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app')

console.log(vm.$constant.UPDATE_TIME);