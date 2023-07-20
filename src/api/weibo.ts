import request from "./axiaosConfig"

/**
 * 微博页列表
 * @param page 页码
 * @returns axiaos请求
 */
const Page = (page: number) => {
  return request({
    url: 'contentlist/page/' + page,
    method: 'get',
  });
}

export { Page }