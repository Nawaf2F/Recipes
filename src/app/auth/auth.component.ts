import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService,AuthResponse } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  errorMessage: string;
 authObs: Observable<AuthResponse>

  constructor(private auth: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.authObs = this.auth.login(email, password)
    } else {
      this.authObs = this.auth.signup(email, password)
    }

    this.authObs.subscribe(
      (reponse) => {
        console.log(reponse);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.error.message;
        this.isLoading = false;
        this.error = `an error occured! ${this.errorMessage}`;
      }
    );
    console.log(form.value);
    form.reset();
  }

  onHandleError(){
    this.error = null;
  }
}
