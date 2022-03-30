import request from '@/utils/request'
import qs from 'qs'

export default {
  getAnnouncement(page, showCount) {
    return request({
      url: '/announcement/pageList',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      data: JSON.stringify({currentPage: page, pageSize: showCount})
    })
  },
  sendAnnouncement(title, body) {
    return request({
      url: '/announcement',
      method: 'post',
      data: qs.stringify({'title': title, 'body': body})
    })
  },
  top(announcementId, isTop) {
    return request({
      url: '/announcement/top/' + announcementId + '/' + isTop,
      method: 'put'
    })
  },
  deleteAnnouncement(id) {
    return request({
      url: '/announcement/' + id,
      method: 'delete'
    })
  }
}
