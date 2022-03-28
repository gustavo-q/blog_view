import request from '@/utils/request'
import qs from 'qs';

export default {
  getTag() {
    return request({
      url: '/tags/getAllTags',
      method: 'get'
    })
  },
  // addTag(tagName) {
  //   return request({
  //     url: '/tag',
  //     method: 'post',
  //     data: qs.stringify({'tagName': tagName})
  //   })
  // },
  // deleteTag(tagId) {
  //   return request({
  //     url: '/tags/' + tagId,
  //     method: 'delete',
  //   })
  // },
  // updateTag(tagId, tagName) {
  //   return request({
  //     url: '/tag',
  //     method: 'put',
  //     data: qs.stringify({'tagId': tagId, 'tagName': tagName})
  //   })
  // }

}
