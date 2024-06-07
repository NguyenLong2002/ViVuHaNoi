
import HomePage from './user/pages/HomePage.vue';
import ToursPage from './user/pages/ToursPage.vue';
import TourDetail from './user/pages/TourDetail.vue';
import BlogPage from './user/pages/BlogPage.vue';
import ContactPage from './user/pages/ContactPage.vue';
import EmailResetForm from './user/pages/EmailResetForm.vue';
import AdminDashboard from './admin/pages/AdminDashboard.vue';
import AdminApp from './admin/AdminApp.vue';
import UserApp from './user/UserApp.vue';
import { checkAdmin } from './utils/utility';

export const routes = [
  {
    path: '/admin',
    component: AdminApp,
    beforeEnter: async (to, from, next) => {
      const isAdmin = await checkAdmin();
      if (isAdmin) {
        next();
      } else {
        next('/');
      }
    },
    children: [
      {
        path: '',
        component: AdminDashboard,
        beforeEnter: async (to, from, next) => {
          const isAdmin = await checkAdmin();
          if (isAdmin) {
            next();
          } else {
            next('/');
          }
        }
      // Add more admin routes here
      }
    ]
  },
  {
    path: '/',
    component: UserApp,
    children: [
      { path: '', component: HomePage },
      { path: 'tours', component: ToursPage },
      { path: 'tours/tour-detail/:id', component: TourDetail, props: true },
      { path: 'blogs', component: BlogPage },
      { path: 'contact', component: ContactPage },
      { path: 'reset-password/:token', component: EmailResetForm },
    ]
  },
];
