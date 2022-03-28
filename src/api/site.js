import request from '@/utils/request'

export default {
  getSite () {
    return request({
      url: '/site',
      method: 'get'
    })
  },


  visitor () {
    return request({
      url: '/site/visitor',
      method: 'get'
    })
  }
}
