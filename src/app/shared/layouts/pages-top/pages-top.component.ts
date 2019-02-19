import { Component, Input } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'pages-top',
  templateUrl: './pages-top.component.html',
  styleUrls: ['./pages-top.component.scss'],
})
export class PagesTopComponent {
  avatarImgSrc: string = 'assets/images/avatar.png';
  userName: string = 'Unknow username';
  userPost: string = 'Unknow userPost';

  sidebarToggle: boolean = true;
  constructor(private _globalService: GlobalService) { }
}
