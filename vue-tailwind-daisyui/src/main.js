import { createApp } from 'vue'
import App from '@/App.vue'
import { pinia } from '@/pinia.js'
import router from "@/router.js";
import '@/style.css'


createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
