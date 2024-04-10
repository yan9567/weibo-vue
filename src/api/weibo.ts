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

/**
 * 搜索结果分页
 * @param query 
 * @param page 
 * @returns 
 */
const Search = (query: string, page: number) => {
  return request({
    url: 'contentlist/search/' + page + '/' + query,
    method: 'get',
  });
}


const Add = (content: string) => {
  return request({
    url: 'contentlist',
    method: 'post',
    //Authorization只能在这传，在axiosConfig里已生成了实例，在那无法更新
    headers: { ...{ 'Authorization': 'bearer ' + userStore.state?.token } },
    data: {
      content: content,
      time: new Date(),
    }
  });
};

const Delete = (id: string) => {
  return request({
    url: 'contentlist/' + id,
    method: 'delete',
    //Authorization只能在这传，在axiosConfig里已生成了实例，在那无法更新
    headers: { ...{ 'Authorization': 'bearer ' + userStore.state?.token } },
  });
};

const Update = (id: string, content: string) => {
  return request({
    url: 'contentlist/' + id,
    method: 'put',
    //Authorization只能在这传，在axiosConfig里已生成了实例，在那无法更新
    headers: { ...{ 'Authorization': 'bearer ' + userStore.state?.token } },
    data: {content}
  });
};

export { Page, Add, Delete, Update, Search }