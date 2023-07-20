import request from "./axiaosConfig"

const login = (username: string, password: string) => {
  return request({
    url: '/login',
    method: 'post',
    params: { username, password }
  });
}