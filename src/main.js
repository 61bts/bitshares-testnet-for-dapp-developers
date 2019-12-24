import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueMaterial from 'vue-material';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import router from './router';
import App from './App.vue';
import en from './i18n/en';
import zh from './i18n/zh-cn';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.config.productionTip = false;

Vue.use(VueMaterial)
Vue.use(VueI18n)

const messages = {
  en,
  zh
};

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
})

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app');
