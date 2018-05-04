import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReigsterComponent } from './reigster/reigster.component';
import { HomeGuard } from '../guards'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [HomeGuard]
  },
  {
    path: 'register',
    component: ReigsterComponent,
    canActivate: [HomeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthRoutingModule {
}
