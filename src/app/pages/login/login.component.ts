import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // tslint:disable-next-line: quotemark
  email = "";
  // tslint:disable-next-line: quotemark
  password = "";
  errorMessage = ''; // validation error handle
  error: { name: string, message: string } = { name: '', message: '' }; // for firbase error handle

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }
  // tslint:disable-next-line: typedef
  login()
  {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice.loginWithEmail(this.email, this.password)
        .then(() => {
         // tslint:disable-next-line: semicolon
         this.router.navigate(['/userinfo'])
        // tslint:disable-next-line: variable-name
        }).catch(_error => {
          // tslint:disable-next-line: semicolon
          this.error = _error
          // tslint:disable-next-line: semicolon
          this.router.navigate(['/login'])
        // tslint:disable-next-line: semicolon
        })
    }
  }
  // tslint:disable-next-line: typedef
  validateForm(email, password) {
    if (email.lenght === 0) {
      this.errorMessage = 'Please enter the email id';
      return false;
    }

    if (password.lenght === 0) {
      this.errorMessage = 'Please enter the password';
      return false;
    }

    if (password.lenght < 6) {
      this.errorMessage = 'Password should be at least 6 characters';
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}
