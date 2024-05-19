import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./pages/auth/auth.component";
import {HomeComponent} from "./pages/home/home.component";
import {AuthGuard} from "./guard/auth.guard";
import {TaskComponent} from "./pages/task/task.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {SigninFormComponent} from "./modules/signin-form/signin-form.component";
import {SignupFormComponent} from "./modules/signup-form/signup-form.component";
import {LoginGuard} from "./guard/login.guard";

const routes: Routes = [
  {path: 'auth', component: AuthComponent, canActivate: [LoginGuard]},
  {path: 'signin', component: SigninFormComponent , canActivate: [LoginGuard]},
  {path: 'signup', component: SignupFormComponent, canActivate: [LoginGuard]},
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: 'task', component: TaskComponent},
      {path: 'profile', component: ProfileComponent},

    ],
  },
  {path: '**', component: SigninFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
