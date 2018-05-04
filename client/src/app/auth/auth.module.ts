import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeGuard } from '../guards';
import { LoginComponent } from './login/login.component';
import { ReigsterComponent } from './reigster/reigster.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [
    LoginComponent, 
    ReigsterComponent
  ],
  providers: [
    HomeGuard
  ]
})
export class AuthModule { }
