import HomePage from './pages/HomePage.vue';
import ToursPage from './pages/ToursPage.vue';
import TourDetail from './pages/TourDetail.vue';
import BlogPage from './pages/BlogPage.vue';
import ContactPage from './pages/ContactPage.vue'
import EmailResetForm from './pages/EmailResetForm.vue'

export const routes = [
    {path:'/', component:HomePage},
    {path:'/tours',component:ToursPage},
    {path:'/tours/tour-detail/:id', component:TourDetail,props: true},
    {path:'/blogs', component:BlogPage},
    {path:'/contact', component:ContactPage},
    {path:'/reset-password/:token', component:EmailResetForm},
]
