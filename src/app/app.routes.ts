import { Routes } from '@angular/router';
import { About } from '../about/about';
import { Home } from '../home/home';
import { Teacher } from '../teacher/teacher';
import { Enquiry } from '../enquiry/enquiry';
import { Courses } from '../courses/courses';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'about', component: About},
    {path:'home', component: Home},
    {path:'teachWithUs', component: Teacher},
    {path:'enquiry',component:Enquiry},
    // {path:'**', title:'404 not found'},
    {path:'courses',component:Courses}
];
