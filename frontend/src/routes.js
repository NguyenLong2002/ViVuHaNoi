import HomePage from './components/views/HomePage.vue';
import ToursPage from './components/views/tours/ToursPage.vue';
import TourDetail from './components/views/tours/TourDetail.vue';
import BlogPage from './components/views/blog/BlogPage.vue';
import ContactPage from './components/views/contact/ContactPage.vue'
import EmailResetForm from './components/auth/password/EmailResetForm.vue'

export const routes = [
    {path:'/', component:HomePage},
    {
        path:'/tours', 
        component:ToursPage,
       
    },
    
    {path:'/tours/tour-detail', component:TourDetail},
    {path:'/blogs', component:BlogPage},
    {path:'/contact', component:ContactPage},
    {path:'/reset-password/:token', component:EmailResetForm},
]
