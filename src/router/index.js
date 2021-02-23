import Vue from 'vue';
import Router from 'vue-router';
import LoginForm from '@/components/LoginForm';
import HomePage from '@/components/HomePage';
import EditPerson from '@/components/EditPerson';
import ViewPeople from '@/components/ViewPeople';


Vue.use(Router);

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginForm
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
        path: '/person',
        name: 'NewPerson',
        component: EditPerson,
        meta: {
            title: 'New Person'
        }
    },
    {
        path: '/person/:person_id',
        name: 'EditPerson',
        component: EditPerson,
        props: true,
        meta: {
            title: 'Edit Person'
        }
    },
    {
      path: '/people',
      name: 'ViewPeople',
      component: ViewPeople,
      meta: {
        title: 'View People'
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;
  next();
});

export default router;