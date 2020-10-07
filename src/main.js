import Vue from 'vue'
import App from './App.vue'

import 'animate.css'
import '@/style/index.scss'

import router from './router'

import './utils/rem.js'

import VueLazyload from "vue-lazyload"

import Msg from "./components/message"

import store from "./store/index"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(Msg);
const EMPTY_IMG = "";

Vue.use(VueLazyload, {
	loading: EMPTY_IMG,
	error: EMPTY_IMG,
});


Vue.config.productionTip = false
new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app')

console.log('2020/10/7 update');