import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//axios:
import axios from 'axios'

var app=createApp(App);
app.use(store).use(router).use(ElementPlus)
app.config.globalProperties.$axios=axios
app.mount('#app')

/**
 * 以上好像是vue3集成ElementPlus与axios的唯一写法
 */