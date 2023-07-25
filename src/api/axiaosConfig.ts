import axios from "axios";
import qs from "qs";
import { MessageFun, NotificationFun } from "~/composables/index";
import useUserStore from "~/store/UserInfo";

const userStore = useUserStore();

//axios实例
const service = axios.create({
    withCredentials: false,
    timeout: 1000,
    headers: { "Content-Type": "application/json" },
    paramsSerializer: (params) => {
        return qs.stringify(params);
    },
});

//请求拦截器
service.interceptors.request.use(
    config => {
        config.baseURL = import.meta.env.VITE_API;
        return config;
    },
    error => Promise.reject(error)
);

//异常拦截器
service.interceptors.response.use(
    response => {
        let { data, headers, config } = response;
        if(headers['content-type'] === 'audio/mpeg') return data;
        if(response.status != 200) return response;
        if(response.data.code === 1000){
            return response.data;
        }
        else{
            return Promise.reject(new Error(response.data.msg))
        }

    },
    error => {
        //Token无效
        if(error.response && error.response.status === 401){
            userStore.Logout();
            NotificationFun(error.response.data.msg, '请求失败', "error");
        }
        NotificationFun(error, '请求失败', "error");
        return Promise.reject(error);
    }
);

export default service;