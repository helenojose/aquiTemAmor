import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routes/routes'
import 'bootstrap-icons/font/bootstrap-icons.css';

const pinia = createPinia()


createApp(App)
.use(pinia)
.use(router)
.mount('#app')
