import './style.css';
import { createApp } from 'vue';
import App from './App.vue';

// Vuetify;
import 'vuetify/styles';
import vuetify from './vuetify';

// Router
import router from './router'; 

// Pinia
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // Plugin para persistir datos en el navegador
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Toastify
import 'vue3-toastify/dist/index.css';

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount('#app');
