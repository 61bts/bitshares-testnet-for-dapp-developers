import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Intro';
import AccountCreator from '@/components/Accounts';


Vue.use(VueRouter);

const route = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HomeIndex',
      component: Home,
    },
    {
      path: '/accounts',
      name: 'AccountCreator',
      component: AccountCreator,
    },
  ],
});

route.beforeEach((to, from, next) => {
  next();
});
export default route;