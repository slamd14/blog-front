/**
 * 配置axios前置拦截与后置拦截
 * 前置拦截:在向后端发起axios请求的时候会携带域名信息,一般把域名信息放在前置拦截中添加
 * 后置拦截:对后端返回的信息进行处理,比如登录时密码错误,返回的res.data.code=0,并携带有res.data.mes="登陆密码错误"
 */

import axios from 'axios'
import {ElMessage} from 'element-plus'
import router from './router'
import store from './store'
//前置拦截
axios.defaults.baseURL="http://8.130.27.140:8081" //这样的话发起axios请求的时候，http://8.130.27.140:8081就会作为前缀添加到请求路径里

axios.interceptors.request.use(config => {
    return config
})

//后置拦截
axios.interceptors.response.use(response => {
    return response;
   // let res = response.data;
    // console.log("========");
    // console.log(res);
    // console.log("========");
    // if (res.code == 1){ //放在全局里不妥,并不是至于code为1就一定是登录成功的响应
    //     ElMessage.success("登录成功");
    //     return response;
    // }else{
    //     ElMessage.error('登陆失败');
    //     return Promise.reject(response.data.msg);//就不会直接终止了这次响应，不会再把响应继续传递
    // }
},
    error => {  //对应类似这种(捕获到异常): @ResponseStatus(HttpStatus.BAD_REQUEST)
        console.log(error);//里面有很多信息,status等，不只是resp.data
        if(error.response.data){
            error.message = error.response.data.msg;
        }
        if(error.response.status == 401){//未认证
            store.commit("REMOVE_INFO");
            ElMessage.error("用户未登录，没有权限执行该操作");
            router.push("/login")
            return Promise.reject(error);
        }
        ElMessage.error(error.message);
        return Promise.reject(error);
    }
)