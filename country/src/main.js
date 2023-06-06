import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomePage from './components/HomePage.vue';
import CountryDescription from './components/CountryDescription.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@popperjs/core/dist/umd/popper.js';

const routes = [
  { path: '/', component: HomePage },
  // Tambahkan rute lain di sini
  {
    name: 'desc-country',
    path: '/desc-country/:country',
    component: CountryDescription,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .mount('#app');
