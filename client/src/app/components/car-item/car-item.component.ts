import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormatsService } from 'src/app/formats.service';
import { UserService } from 'src/app/user.service';
import { ICar } from '../../car.entity';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.sass']
})
export class CarItemComponent implements OnInit {
  @Input() car: ICar
  currency: string
  isAdmin: boolean
  subscriptions: Subscription[] = []

  constructor(
    private _formatsService: FormatsService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._formatsService.currency$.subscribe(currency => this.currency = currency),
      this._userService.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin)
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
