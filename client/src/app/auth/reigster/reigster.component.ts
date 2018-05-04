import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, AuthService } from '../../services';

@Component({
  selector: 'app-reigster',
  templateUrl: './reigster.component.html',
  styleUrls: ['./reigster.component.css']
})
export class ReigsterComponent implements OnInit {
  model: any = {};
  loading = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.authService.register(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['login']);
        },
        error => {
          console.log(error.error.message);
          this.alertService.error(error.error.message);
          this.loading = false;
        });
  }
}