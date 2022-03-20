import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
// 重置样式表
import 'normalize.css/normalize.css'
// 导入图标库
import "@/assets/style/icon.scss"

createApp(App).use(store).use(router).mount('#app')
