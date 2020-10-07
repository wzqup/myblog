import Vue from 'vue'
import message from './message.vue'

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
		data:options
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
export default {
	//main.js中  Vue.use会自己调用install
	install(Vue) {
		Vue.prototype.$msg = caller
	}
}