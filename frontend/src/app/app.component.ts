import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrentUserInfo } from '../common/services/currentUserInfo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'employee-portal';

  constructor(private _userInfoService: CurrentUserInfo){

  }

  ngOnInit():void{
    console.log('helo for app component');
    if(localStorage.getItem('sid'))
    {
      this._userInfoService.storeCurrentUserInfo();
    }
  }
}
