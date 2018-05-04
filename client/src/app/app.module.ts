import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

import { AlertService, AuthService, UserService } from './services';
import { AlertComponent } from './alert/alert/alert.component';
import { AuthGuard } from './guards';
import { HomeNavComponent } from './navbar/home-nav/home-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HomeModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService,
    UserService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptor,
    //   multi: true
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
