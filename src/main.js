import Vue from 'vue'
import App from './App.vue'

import 'animate.css'
import '@/style/index.scss'

import router from './router'

import './utils/rem.js'

// import axios from './utils/axios'
// Vue.use(axios)

import { Button,Card,Cascader,InputNumber,Switch,Dialog,Input,Select,Option,DatePicker,Table,TableColumn} from 'element-ui'

Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Card);
Vue.use(Cascader);
Vue.use(InputNumber);
Vue.use(Switch);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Table);
Vue.use(TableColumn);


new Vue({
	render: h => h(App),
	router
}).$mount('#app')
