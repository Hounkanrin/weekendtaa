import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAuth: boolean;
  loginForm: FormGroup;
  baseUrl: 'persons/';

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });


  }

  login() {
    console.log(this.loginForm.value);
    this.appService.login(this.loginForm.value);
    this.isAuth = this.appService.login(this.loginForm.value);
    this.router.navigate(['dashboard']);
  }

  isAuthenticated() {
    return this.isAuth;

  }

}
