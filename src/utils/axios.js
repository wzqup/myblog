import axios from 'axios'

// 调用方法
// export default {
// 	install(Vue){
// 		// axios.defaults.baseURL = 'https://api.mtnhao.com/';
// 		Vue.prototype.$http = axios
// 	}
// }

export const musicRequest = createInstance('https://api.mtnhao.com/');
export const request = createInstance('https://api.aaaa.com/');


function createInstance (baseUrl){
	let instance = axios.create({
		baseURL: baseUrl
	})
	instance.interceptors.response.use(handleResponse, handleError)
	return instance
}

function handleError(e) {
	confirm('出错啦~' + e.message + '请检查网络连接或稍后再试!!')
	throw e
  }
  
  function handleResponse(response) {
	return response.data
  }