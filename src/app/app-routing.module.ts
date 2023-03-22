import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './pages/teacher/teacher-dashboard/teacher-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { StudentGuard } from './services/student.guard';
import { TeacherGuard } from './services/teacher.guard';

const routes: Routes = [

  {
    //toto bude teda úvodná stránka, keď nemá path
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  {
    path: 'teacher',
    component: TeacherDashboardComponent,
    pathMatch: 'full',
    canActivate: [TeacherGuard],
  },
  {
    path: 'student',
    component: StudentDashboardComponent,
    pathMatch: 'full',
    canActivate: [StudentGuard],
  },
  //toto je vlastne routing. ked zadám localhost:4200/student - tak ma presmeruje na student-dasthboard.component.html a zobrazí mi čo je tam


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
