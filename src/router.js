import { defineAsyncComponent } from 'vue';

const HomePage = defineAsyncComponent(() => import('./components/HomePage.vue'));
const AboutPage = defineAsyncComponent(() => import('./components/AboutPage.vue'));
import ContactPage from './components/ContactPage.vue';




const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/contact', component: ContactPage },

];



export default routes;
