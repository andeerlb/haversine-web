import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from '../../shared/models/user';
import { TokenStorage } from '../../shared/services/auth/token-storage';
import { AuthToken } from '../../shared/models/auth-token.model';
import { timingSafeEqual } from 'crypto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService, TokenStorage]
})
export class LoginComponent implements OnInit {

  @ViewChild ('username') inptUsername: ElementRef;
  
  loginForm: FormGroup;
  send: boolean = false;
  badCredencials = false;
  timeOut: any;

  constructor(private formBuilder: FormBuilder, 
              private _loginService: LoginService,
              private _tokenStorage: TokenStorage,
              private _router: Router
              ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  getErrorMessage(field: FormControl, fieldName: String) {
    if(field === undefined) return;
    return field.hasError('required') ? `O preenchimento do campo ${fieldName} é obrigatório!` : '';
  }

  submit(user: User) {
    this.send = true;
    this.loginForm.disable();

    user.client_id = 'marcelos_client';
    user.client_secret = '123';

    clearTimeout(this.timeOut);
    this._loginService.authenticate(user).toPromise()
        .then((token: AuthToken) => {
          this._tokenStorage.save(token);
          this._router.navigateByUrl('');
        }).catch(() => {
          this.send = false;
          this.badCredencials = true;
          this.timeOut = setTimeout(() => {
            this.badCredencials = false;
          }, 2000);
          this.loginForm.enable();
          this.inptUsername.nativeElement.focus(); 
          this.inptUsername.nativeElement.select(); 
        });
  }
}
