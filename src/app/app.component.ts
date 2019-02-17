import { Component, OnInit } from '@angular/core';
import { TokenStorage } from './shared/services/auth/token-storage';
import { AuthToken } from './shared/models/auth-token.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  providers: [TokenStorage]
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private _tokenStorage: TokenStorage,
              private router: Router){}

  ngOnInit(){
    let token: AuthToken = this._tokenStorage.get();
    if(!token || !token.access_token) {
      this.router.navigateByUrl('/login');
    }

  }
}
