import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {
  isAdmin: boolean

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this._userService.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin)
  }

  onLogout() {
    this._userService.logout()
  }

}
