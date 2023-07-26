import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { Server } from './Server'

async function main() {

    let server = Server.getInstance()
    await server.init()

    const app = createApp(App)
    app.use(router)
    app.mount('#app')
}

main()
