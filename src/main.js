import './style.css';
import { createApp } from 'vue';
import App from './App.vue';

// Vuetify;
import 'vuetify/styles';
import vuetify from './vuetify';

// Router
import router from './router'; 

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.mount('#app');
