import axios from 'axios'
import qs from 'qs'
/*import store from './store/store'*/

//axios.defaults.timeout = 5000;                        //响应时间
//axios.defaults.headers.post['x-token'] = localStorage.getItem('token');//'123.123.123'
axios.defaults.headers['Content-Type'] = 'application/json';  //配置请求头
axios.defaults.baseURL = 'http://193.168.11.186';   //配置接口地址

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
   /* if(localStorage.getItem("token")){
        axios.defaults.headers['x-token'] = JSON.parse(localStorage.getItem("token"));//'123.123.123'
    }*/

    return config;
},(error) =>{
    console.log('错误的传参')
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
    //对响应数据做些事
    /*if(res.headers['x-token']){
        localStorage.setItem("token",JSON.stringify(res.headers['x-token']));
    }*/
    if(!res.data.success){
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    console.log('网络异常')
    return Promise.reject(error);
});


//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    //axios.defaults.headers['x-token'] = JSON.parse(localStorage.getItem("token"));
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    fetchPost,
    fetchGet,
}
