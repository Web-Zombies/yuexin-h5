import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'home',
    component: () => import('./view/home'),
    meta: {
      title: '首页'
    }
  }, {
    name: 'release',
    component: () => import('./view/release'),
    meta: {
      title: '放行申请'
    }
  }, {
    name: 'release-tow',
    component: () => import('./view/release-tow'),
    meta: {
      title: '放行申请'
    }
  }, {
    name: 'apply',
    component: () => import('./view/release-tow/apply'),
    meta: {
      title: '申请放行'
    }
  }, {
    name: 'coupon',
    component: () => import('./view/coupon'),
    meta: {
      title: '优惠劵列表'
    }
  }
  , {
    name: 'coupon-details',
    component: () => import('./view/coupon/details'),
    meta: {
      title: '优惠劵详情'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
