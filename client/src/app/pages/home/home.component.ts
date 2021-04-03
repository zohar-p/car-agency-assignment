import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  isAdmin: boolean
  subscriptions: Subscription[] = []

  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._userService.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin)
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
