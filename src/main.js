import Vue from 'vue'
import App from './App.vue'

import '@/style/index.scss'
import '@/assets/iconfont/iconfont.css'

import router from './router'

import './utils/rem'

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router
}).$mount('#app')
