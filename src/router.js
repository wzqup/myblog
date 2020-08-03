import Vue from 'vue';
import Router from 'vue-router'

// 组件
import Home from './pages/Home'
import Project from './pages/project';
import Aboutme from './pages/aboutme';
import Demolist from './pages/demolist';
import Cv from './pages/cv';
import Myblog from './pages/myblog'

// demolist
import TimeBar from './components/TimeBar';
import Cube from './components/Cube';
import Music from './pages/music';


// 路由
const routes = [{
		path: '/',
		redirect: {
			name: 'aboutme'
		}
	},
	{
		path: '/home',
		component: Home,
		children: [{
				path: '/aboutme',
				component: Aboutme,
				name: 'aboutme',
				meta:{
					title:'关于我'
				}
			},
			{
				path: '/cv',
				component: Cv,
				name: 'cv',
				meta:{
					title:'我的简历'
				}
			},
			{
				path: '/project',
				component: Project,
				name: 'project',
				meta:{
					title:'项目经历'
				}
			},
			{
				path: '/demolist',
				component: Demolist,
				children:[
					{
						path: '/',
						component: TimeBar,
						name: 'demolist',
						meta:{
							title:'DEMO'
						}
					},
					{
						path:'timebar',
						component:TimeBar,
						name:'timebar'
					},{
						path:'cube',
						component:Cube,
						name:'cube'
					},{
						path:'music',
						component:Music,
						name:'music'
					}
				]
			},
			{
				path: '/myblog',
				component: Myblog,
				name: 'myblog',
				meta:{
					title:'我的博客'
				}
			},
		]
	},
]

// 创建router实例
Vue.use(Router)

// 解决使用push导航重复点路由报错的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const router = new Router({
	routes
})


// 修改页面title
router.beforeEach((to, from, next) => {
	if(to.meta.title){
		document.title = to.meta.title
	}
	let dom = document.getElementById('view');
	if(to.fullPath.indexOf('demolist') > -1){
		dom.setAttribute('content','');
	} else {
		dom.setAttribute('content','width=device-width, initial-scale=1, user-scalable=no');
	}
	next()
})


export default router;