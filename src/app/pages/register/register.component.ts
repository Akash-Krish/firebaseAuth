import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // tslint:disable-next-line: quotemark
  email = "";
  // tslint:disable-next-line: quotemark
  password = "";
  message = '';
  errorMessage = '';
  error: {name: string, message: string} = {name: '', message: ''};

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message: ''};
  }

  // tslint:disable-next-line: typedef
  register()
  {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password))
    {
      this.authservice.registerWithEmail(this.email, this.password)
      .then(() =>
      {
        // tslint:disable-next-line: no-unused-expression
        // tslint:disable-next-line: semicolon
        this.message = 'You have successfully registered the data on firbase'
       // this.router.navigate(['/userinfo'])
      // tslint:disable-next-line: semicolon
      // tslint:disable-next-line: variable-name
      }).catch(_error => {
        // tslint:disable-next-line: semicolon
        this.error = _error
        // tslint:disable-next-line: semicolon
        this.router.navigate(['/register'])
      // tslint:disable-next-line: semicolon
      })
    }
  }
  // tslint:disable-next-line: typedef
  validateForm(email, password)
  {
    if (email.lenght === 0)
    {
      this.errorMessage = 'Please Enter Email id';
      return false;
    }
    if (password.lenght === 0) {
      this.errorMessage = 'Please Enter Password';
      return false;
    }
    if (password.lenght < 6)
    {
      this.errorMessage = 'Password should be at least have 6 characters';
      return false;
    }
    this.errorMessage = '';
    return true;
  }
}
