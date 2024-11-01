import './assets/main.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '108DCC',
          secondary: 'E2E4C6'
        }
      }
    }
  }
});

const pinia = createPinia();

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(pinia);

app.mount('#app');
