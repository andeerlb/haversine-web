import { Component, OnInit } from '@angular/core';
import { PagesTopService } from './pages-top.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'pages-top',
  templateUrl: './pages-top.component.html',
  styleUrls: ['./pages-top.component.scss'],
  providers: [PagesTopService]
})
export class PagesTopComponent implements OnInit {
  avatarImgSrc: string = 'assets/images/avatar.png';
  name: string = 'Unknow name';
  username: string = 'Unknow username';

  sidebarToggle: boolean = true;
  constructor(private _service: PagesTopService, private _router: Router) { }

  ngOnInit(): void {
    this._service.getUserLogged().toPromise()
          .then((user: User) => {
            this.username = user.username ? user.username : this.username;
            this.name = user.name ? user.name : this.name;
          }).catch(e => {
            console.error(e);
          })
  }

  public _logout(): void {
    this._service.logout().toPromise()
          .then(() => {
            console.log('loggout');
            this._router.navigateByUrl("/login");
          }).catch((e) => {
            console.error('impossible to execute loggout');
          });
  }
}
