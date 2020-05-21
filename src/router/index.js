import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/note/:id',
    component: () => import('../views/NoteDetail.vue')
  },
  {
    path: '*',
    redirect: to => "/"
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
