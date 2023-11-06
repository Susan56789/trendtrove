import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './main.css'

const app = createApp(App);
app.use(router); // Use the router instance
app.mount('#app');