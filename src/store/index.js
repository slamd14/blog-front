import { createStore } from 'vuex'

export default createStore({
  state: {
    //想象成java对象的私有属性
    token: localStorage.getItem("token"),
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  getters: {
    //想象成java中的get()
    GET_USERINFO: state => {
      return state.userInfo
    }
  },
  mutations: {
    //set()
    SET_TOKEN: (state,token) => {
      state.token=token;
      localStorage.setItem("token",token);
    },
    SET_USERINFO: (state,userInfo) => {
      state.userInfo=userInfo;
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
    },
    REMOVE: (state) => {
      state.token= '';
      state.userInfo= {};
      localStorage.setItem("token",'');
      sessionStorage.setItem("userInfo",JSON.stringify(''));
    }
  }
  ,
  actions: {
  },
  modules: {
  }
})
