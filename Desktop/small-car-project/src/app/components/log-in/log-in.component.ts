import { Component } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  emailInput: string = '';
  passwordInput: string = '';

  constructor(
    private loginService: LoginServiceService,
    public router:Router
  ) {}
  submitHandler() {
    const token = this.loginService.loginHandler(
      this.emailInput,
      this.passwordInput
    );
    if (token) {
      localStorage.setItem('token', token);
      console.log('you are logged in');
      this.router.navigate(['/feed'])
    } else {
      console.log('Wrong Email or password');
    }
  }
}
