import request from "./axiaosConfig"
import useUserStore from "~/store/UserInfo";

const userStore = useUserStore();

const login = (username: string, password: string) => {
  return request({
    url: '/login',
    method: 'post',
    data: { username, password }
  });
}

const regist = (username: string, password: string) => {
  return request({
    url: '/users',
    method: 'post',
    data: { username, password }
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

export { login, regist, all, updateHeadPic };