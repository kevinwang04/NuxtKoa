import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
// import {Message} from 'element-ui'
axios.defaults.timeout = 60000
// axios 配置
export default ({ app, app: { router }, store,...rest }) => {
  // http request 拦截器
  axios.interceptors.request.use(
    config => {
      if(config.formData) {
        //----------------------  修改axios默认传参为form data  ---------------------
        config.headers.post['Content-Type'] =
          'application/x-www-form-urlencoded'
        config.transformRequest = [
          function(data) {
            return qs.stringify(data)
          }
        ]
      }
      if (store.state.token) {
        config.headers.token = store.state.token
      }
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )

  // http response 拦截器
  axios.interceptors.response.use(
    response => {
      // ----------------------  登出  ---------------------
      if(!response.data.success && response.data.err === 'Please login') {
        store.commit('logout')
        router.replace({
          path: '/login'
        })
      } 
      return response
      // 
    },
    error => {
      // ----------------------  解决axios默认发送一次undefined请求  ---------------------
      if(error.message === "Cannot read property 'cancelToken' of null") return
      if(error.response && error.response.status === 401) {
        store.commit('logout', router)
      } else {
        console.log(error.message)
        // Message.error(error.message)
      }
      return Promise.reject(error)
    }
  )

  return axios
}