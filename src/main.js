import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'normalize.css'
import '@/assets/styles/common.less'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/assets/styles/date.scss'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
