import axios from "axios";
import qs from "qs";
import { MessageFun } from "~/composables/index";

//axios实例
const service = axios.create({
    withCredentials: false,
    timeout: 1000,
    headers: {"Content-Type": "application/json"},
    paramsSerializer: (params) => {
        return qs.stringify(params);
    },
});

//请求拦截器
service.interceptors.request.use(
    config => {
        config.baseURL = 'http://localhost:3001/api'//https://www.ppos.top/api';//'http://localhost:3001'
        return config;
    },
    error => Promise.reject(error)
);

//异常拦截器
service.interceptors.response.use(
    response => {
        let { data, headers, config } = response;
        if(headers['content-type'] === 'audio/mpeg') return data;
        return response;

    },
    error => {
        // MessageFun('网络异常，请稍后再试', "error");
        return Promise.reject(error);
    }
);

export default service;