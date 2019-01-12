import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { PersonService } from '../service/person-services/person.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  submited: boolean;
  loginForm: FormGroup;
  baseUrl: 'persons/';

  isAuthSouscription: Subscription;

  constructor(private fb: FormBuilder, private appService: AppService, private personService: PersonService, private router: Router, ) { }

  ngOnInit() {
    this.submited = false;
    this.isAuthSouscription = this.appService.isAuthSubject.subscribe(data => {
      this.isAuth = data;
      console.log("isAuth", this.isAuth);
      if (this.isAuth) {
        console.log("isAuth", this.isAuth);
        // alert();
        this.router.navigate(['dashboard']);
      }
    });
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.submited = true;
    this.appService.login(this.loginForm.value);
  }

  ngOnDestroy() {
    this.isAuthSouscription.unsubscribe();
  }

}
