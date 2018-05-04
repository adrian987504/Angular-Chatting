import { Component, OnInit } from '@angular/core';
import { AuthService } from './services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
}
