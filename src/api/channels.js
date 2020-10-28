/**
 * 获取文章频道
 */
import request from "@/utils/request";

const getArticleChannels = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels'
    })
}

export default getArticleChannels
