import request from "./axiaosConfig"
import useUserStore from "~/store/UserInfo";
import CryptoJS from 'crypto-js'

const userStore = useUserStore();

const encryPwd = (pwd: string): string => {
  return CryptoJS.HmacMD5(pwd, '!@#').toString();
}

const login = (username: string, password: string) => {
  return request({
    url: '/login',
    method: 'post',
    data: { username, password: encryPwd(password) }
  });
}

const regist = (username: string, password: string) => {
  return request({
    url: '/users',
    method: 'post',
    data: { username, password: encryPwd(password) }
  });
}

const all = () => {
  return request({
    url: '/users',
    method: 'get',
  });
}

const updateHeadPic = (headUrl: string) => {
  return request({
    url: '/users',
    method: 'put',
    data: { headUrl },
    headers: { Authorization: userStore.getToken }
  });
}

const loginbygithub = (code: string) => {
  return request({
    url: '/login',
    method: 'get',
    params: {code}
  });
}

export { login, regist, all, updateHeadPic, loginbygithub };