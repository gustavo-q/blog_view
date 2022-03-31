import request from '@/utils/request'
import qs from 'qs';

export default {
  getAllCategory() {
    return request({
      url: '/category/getAllCategory',
      method: 'get'
    })
  }

}
