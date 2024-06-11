import HomePage from './user/pages/HomePage.vue';
import ToursPage from './user/pages/ToursPage.vue';
import TourDetail from './user/pages/TourDetail.vue';
import BlogPage from './user/pages/BlogPage.vue';
import ContactPage from './user/pages/ContactPage.vue';
import EmailResetForm from './user/pages/EmailResetForm.vue';
import AdminDashboard from './admin/pages/AdminDashboard.vue';
import AdminApp from './admin/AdminApp.vue';
import UserApp from './user/UserApp.vue';

import TourRouter from './admin/pages/tour/TourRouter.vue'
import ShowTours from './admin/pages/tour/ShowTours.vue';
import CreateTour from './admin/pages/tour/CreateTour.vue';
import UpdateTour from './admin/pages/tour/UpdateTour.vue';
import TrashTour from './admin/pages/tour/TrashTour.vue';


import UserAdmin from './admin/pages/user/ShowUsers.vue';
import BlogAdmin from './admin/pages/blog/ShowBlogs.vue';
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
        component: AdminDashboard
      },
      {
        path: 'tours',
        component: TourRouter,
        children: [
          {
            path: '',
            component: ShowTours,
          },
          {
            path: 'add',
            component: CreateTour,
          },
          {
            path: ':id/edit',
            component: UpdateTour,
          },
          {
            path: 'trash',
            component: TrashTour,
          }
        ]
      },
      {
        path: 'users',
        component: UserAdmin
      },
      {
        path: 'blogs',
        component: BlogAdmin
      },
      
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
      { path: 'reset-password/:token', component: EmailResetForm, props: true },
    ]
  },
];
