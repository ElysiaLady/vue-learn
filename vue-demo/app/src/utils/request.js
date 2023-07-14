import axios from "axios";

const http = axios.create({
    //通用请求的地址前缀
    baseURL:'/api',
    timeout:10000,//ms
})

//添加请求拦截器
http.interceptors.request.use(function (config){
    return config;
},function(error){
    return Promise.reject(error);
});

//添加响应拦截器
http.interceptors.response.use(function (response){
    return response;
},function(error){
    return Promise.reject(error);
});

export default http