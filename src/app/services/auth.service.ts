import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private afu: AngularFireAuth, private router: Router ) {
    // tslint:disable-next-line: no-shadowed-variable
    this.afu.authState.subscribe((auth => {
      this.authState = auth;
    // tslint:disable-next-line: semicolon
    }))
  }
    // all firebase getdata functions

    get isUserAnonymousLoggedIn(): boolean {
      // tslint:disable-next-line: semicolon
      return (this.authState !== null) ? this.authState.isAnonymous : false
    }

    get currentUserId(): string {
      // tslint:disable-next-line: semicolon
      return (this.authState !== null) ? this.authState.uid : ''
    }

    get currentUserName(): string {
      // tslint:disable-next-line: no-string-literal
      return this.authState['email'];
    }

    get currentUser(): any {
      return (this.authState !== null) ? this.authState : null;
    }

    get isUserEmailLoggedIn(): boolean {
      if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
        // tslint:disable-next-line: semicolon
        return true
      } else {
        // tslint:disable-next-line: semicolon
        return false
      }
    }


  // tslint:disable-next-line: typedef
  registerWithEmail(email: string, password: string)
  {
    return this.afu.createUserWithEmailAndPassword(email, password).then((user) =>
    {
      // tslint:disable-next-line: semicolon
      this.authState = user
    }).catch(error =>
      {
        // tslint:disable-next-line: semicolon
        console.log(error)
        // tslint:disable-next-line: semicolon
        throw error
      });
  }

  // tslint:disable-next-line: typedef
  loginWithEmail(email: string, password: string)
  {
    return this.afu.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // tslint:disable-next-line: semicolon
        this.authState = user
      })
      .catch(error => {
        // tslint:disable-next-line: semicolon
        console.log(error)
        // tslint:disable-next-line: semicolon
        throw error
      });
  }
  signout(): void
  {
    this.afu.signOut();
    this.router.navigate(['/login']);
  }
}
