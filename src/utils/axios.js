import axios from 'axios'

export const musicRequest = createInstance('https://api.mtnhao.com/');


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