import { Routes } from '@angular/router';
import { About } from '../about/about';
import { Home } from '../home/home';
import { Teacher } from '../teacher/teacher';
import { Enquiry } from '../enquiry/enquiry';
import { Courses } from '../courses/courses';
import { Login } from '../login/login';
import { LandingPage } from '../landing-page/landing-page';
import { Dashboard } from '../dashboard/dashboard';
import { Students } from '../students/students';
import { CertifiedStudent } from '../studentDetail/certified-student/certified-student';
import { CompletedStudent } from '../studentDetail/completed-student/completed-student';
import { Attendance } from '../studentDetail/attendance/attendance';
import { Fees } from '../studentDetail/fees/fees';
import { authGuard, loginGuard } from '../auth.gaurd';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'about', component: About },
  { path: 'home', component: Home },
  { path: 'teachWithUs', component: Teacher },
  { path: 'enquiry', component: Enquiry },
  { path: 'courses', component: Courses },

  {
    path: 'login',
    component: Login,
    canActivate: [loginGuard]
  },

  { path: 'forgot_pass', component: Login },

  {
    path: 'admin',
    component: LandingPage,
    canActivate: [authGuard], // ✅ THIS WAS MISSING
    children: [
      { path: '', component: Dashboard },
      { path: 'students', component: Students },
      { path: 'certifiedStudents', component: CertifiedStudent },
      { path: 'completedStudents', component: CompletedStudent },
      { path: 'attendance', component: Attendance },
      { path: 'fees', component: Fees }
    ]
  }
];
