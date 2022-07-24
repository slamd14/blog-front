import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//axios:
import axios from 'axios'

//markDown编辑器
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
VMdEditor.use(githubTheme);

//axios.js:
import "./axios"

//permission.js
import "./permission"


var app=createApp(App);
app.use(store).use(router).use(ElementPlus).use(VMdEditor)
app.config.globalProperties.$axios=axios
app.mount('#app')

/**
 * 以上好像是vue3集成ElementPlus与axios的唯一写法
 */