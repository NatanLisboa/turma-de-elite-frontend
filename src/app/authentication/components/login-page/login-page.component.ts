import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['',Validators.email],
    password: ['', Validators.required]
  })

  isEmailInvalid = false;
  isPasswordInvalid = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  login(){
    const {email,password} = this.loginForm.value;
    this.auth.login(email,password)
      .then()
      .catch(error => {
        switch (error?.code){
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            this.isEmailInvalid = true;
            break;
          case 'auth/wrong-password':
            this.isPasswordInvalid = true;
            break;
          default:
            this.showSnackbar('Erro inesperado');
            break;

        }
      });
  }

  showSnackbar(message: string){
    this.snackbar.open(message,'Fechar');
  }

}
