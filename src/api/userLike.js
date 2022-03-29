import request from '@/utils/request'
import qs from 'qs';

export default {
  saveUserLike(blogId, status) {
    return request({
      url: '/userLike/saveUserLike',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      data: JSON.stringify({bolgId: blogId, status: status})
    })
  },
  getBlogLikeCount(blogId) {
    return request({
      url: '/userLike/getBlogLikeCount' + '/' + blogId,
      method: 'get'
    })
  },
  isUserLike(blogId, id) {
    return request({
      url: '/userLike/isUserLike' + '/' + blogId + '/' + id,
      method: 'get'
    })
  },
}
