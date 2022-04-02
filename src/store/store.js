import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/api/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roles: localStorage.getItem('roles') == null ? '' : localStorage.getItem('roles'),
    token: localStorage.getItem('token') == null ? '' : localStorage.getItem('token'),
    name: localStorage.getItem('name') == null ? '' : localStorage.getItem('name'),
    id: localStorage.getItem('id') == null ? '' : localStorage.getItem('id'),
    avatar: localStorage.getItem('avatar') == null ? '' : localStorage.getItem('avatar')

  }, mutations: {
    login(state, data) {
      console.log(data)
      // 变更状态
      this.state.token = data.corTicket;
      localStorage.setItem('token', data.corTicket);

    },
    getCurrentUserInfo(state){
      user.getCurrentUserInfo().then(res => {
        //存储用户名
        this.state.name = res.data.username;
        localStorage.setItem('name', res.data.username)

        this.state.roles = res.data.roleId;
        localStorage.setItem('roles', res.data.roleId)

        this.state.id = res.data.id;
        localStorage.setItem('id', res.data.id)

        this.state.avatar = res.data.avatar;
        localStorage.setItem('avatar', res.data.avatar)
      })


    },
    logout(state) {
      localStorage.removeItem('token');
      this.state.token = '';
      localStorage.removeItem('name');
      this.state.name = '';
      localStorage.removeItem('roles');
      this.state.roles = '';
      localStorage.removeItem('id');
      this.state.id = '';
      localStorage.removeItem('avatar');
      this.state.avatar = '';
    },
    refresh(state, token) {  //刷新token
      this.state.token = token;
      localStorage.setItem('token', token);
    }
  }
})
