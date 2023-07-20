import request from "./axiaosConfig"
import useUserStore from "~/store/UserInfo";

const userStore = useUserStore();

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

const Add = (content: string) => {
  return request({
    url: 'contentlist',
    method: 'post',
    headers: {'Authorization': 'bearer ' + userStore.state?.token},
    data: {
      content: content,
      time: new Date(),
    }
  });
};

const Delete = (id: string) => {

};

export { Page, Add, Delete }