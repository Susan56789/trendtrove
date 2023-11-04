import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './router'; // Assuming your routes are defined in a separate file
import './main.css'



const app = createApp(App);
const router = createRouter({
    history: createWebHistory(),
    routes,
});

app.use(router);
app.mount('#app');
