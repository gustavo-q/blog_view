import request from '@/utils/request'
import qs from 'qs';

export default {
  getNewDiscuss() {
    return request({
      url: '/comment/NewDiscuss',
      method: 'get'
    })
  },
  getUserNewDiscuss(){ //用户最近评论
    return request({
      url: '/comment/userNewDiscuss',
      method: 'get'
    })
  },
  getDiscussByBlogId(topicId, currentPage, pageSize) {
    return request({
      url: '/comment/pageList',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      data: JSON.stringify({topicId:topicId, currentPage:currentPage, pageSize:pageSize})
    })
  },
  sendDiscuss(blogId, discussBody,num) {  //发送评论
    return request({
      url: '/comment/addComment',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      data: JSON.stringify({blogId:blogId, discussBody:discussBody,num:num})
    })
  },
  adminDeleteDiscuss(discussId) { //管理员删除评论
    return request({
      url: '/discuss/admin/' + discussId,
      method: 'delete'
    })
  },
  userDeleteDiscuss(discussId) { //用户删除评论
    return request({
      url: '/comment/delComment/' + discussId,
      method: 'delete'
    })
  },
  adminDeleteReply(replyId) { //管理员删除回复
    return request({
      url: '/reply/admin/' + replyId,
      method: 'delete'
    })
  },
  // userDeleteReply(replyId) { //用户删除回复
  //   return request({
  //     url: '/reply/' + replyId,
  //     method: 'delete'
  //   })
  // },



}
