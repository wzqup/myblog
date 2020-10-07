import Vue from 'vue';
import Router from 'vue-router';
import {isPC} from '@/utils/helper.js'

// 组件
const Index = () => import('./pages/index');
const Home = () => import('./pages/Home');
const Project = () => import('./pages/project');
const Aboutme = () => import('./pages/aboutme');
const Demolist = () => import('./pages/demolist');
const Cv = () => import('./pages/cv');
const Myblog = () => import('./pages/myblog');


// demolist
const TimeBar = () => import('./pages/demolist/timebar');
const Cube = () => import('./pages/demolist/cube');
const Music = () => import('./pages/demolist/music');

// tese
const Dev = () => import('./pages/deving/index.vue');



// 路由
const routes = [{
		path: '/',
		component: Index
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
			{
				path: '/message',
				component: Dev,
				name: 'message',
				meta:{
					title:'给我留言'
				}
			},
			{
				path: '/favorites',
				component: Dev,
				name: 'favorites',
				meta:{
					title:'我的收藏'
				}
			}
		]
	}
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
	if(to.fullPath.indexOf('demolist') > -1 && !isPC()){
		dom.setAttribute('content','');
	} else {
		dom.setAttribute('content','width=device-width, initial-scale=1, user-scalable=no');
	}
	next()
})


export default router;