import request from "./axiaosConfig"

const Page = (page: number) => {
    return request({
        url: 'contentlist/page/' + page,
        method: 'get',
    });
}

export {Page}