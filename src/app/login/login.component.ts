import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  baseUrl: 'persons/'

  constructor(private fb: FormBuilder, private appService: AppService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })


  }

  login() {
    this.appService.authenticate(this.loginForm.value);
    //   this.router.navigateByUrl('/');
    // });
    // return false
    if (this.appService.authenticated) {
      this.baseUrl
      //TODO faire la redirection vers la page d'accueil
    }
  }

}
