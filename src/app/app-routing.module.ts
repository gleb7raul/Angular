import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './pages/courses/courses.component';
import { AddEditCourseComponent } from './pages/courses/add-edit-course/add-edit-course.component';
import { LoginComponent } from './pages/login/login.component';
import { P404Component } from './pages/p404/p404.component';

import { AuthGuard } from './guards/auth.guard';
import { CourseResolver } from './SSRResolvers/CourseResolver';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  {
    path: 'courses',
    canActivate: [AuthGuard],
    component: CoursesComponent,
    pathMatch: 'full',
  },
  {
    path: 'courses/:id',
    canActivate: [AuthGuard],
    component: AddEditCourseComponent,
    resolve: { courseData: CourseResolver },
  },
  {
    path: 'courses/new',
    canActivate: [AuthGuard],
    component: AddEditCourseComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
