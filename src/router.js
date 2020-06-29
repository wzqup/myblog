import Vue from 'vue';
import Router from 'vue-router'

// 组件
import Home from './pages/Home'
import Project from './pages/project';
import Aboutme from './pages/aboutme'


// 路由
const routes = [
	{ path: '/', redirect: {name:'aboutme'} },
	{path:'/home',component:Home,children:[
		{path:'/aboutme',component:Aboutme,name:'aboutme'},
		{path:'/project',component:Project,name:'project'}
	]},
] 

// 创建router实例
Vue.use(Router)

const router = new Router({
	routes
})


export default router;