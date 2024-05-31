import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './style/main.scss'
// import { routers } from '@/routers' 

const app = createApp(App)
const pinia = createPinia()
// app.use(routers)
app.use(pinia)
app.mount('#app')
