import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 懒加载插件
import VueLazyload from "vue-lazyload"

// 常量
import Constant from "./const"
// 信息框组件
import message from '@/components/message.vue'

export default {
	install(Vue) {
		Vue.use(ElementUI);
		Vue.use(VueLazyload, {
			loading: Constant.EMPTY_IMG,
			error: Constant.EMPTY_IMG,
		});
		Vue.prototype.$constant = Constant;

		// 通过js调用的信息框
		//通过extend构造器 创建一个‘子类’
		const MsgConstructor = Vue.extend(message)
		let msg;
		let caller = (options) => {
			// 处理传入数据字符串或者对象
			options = options || {};
			if (typeof options === 'string') {
				options = {
					text: options
				};
			}
			// 实例化
			msg = new MsgConstructor({
				data: options
			});
			msg.closed = true;
			msg.$mount()
			// 插入文档 挂载
			if (options.el) {
				options.el.appendChild(msg.$el)
			} else {
				document.body.appendChild(msg.$el)
			}

		}
		Vue.prototype.$msg = caller
	}
}