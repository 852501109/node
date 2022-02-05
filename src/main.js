import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import imgUpload from './components/imgUpload/imgUpload.vue'
const service = createApp(App)
service.use(ElementPlus).mount('#app')
// service.component('imgUpload', imgUpload).mount('#app')