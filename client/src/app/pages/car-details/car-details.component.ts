import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICar } from 'src/app/car.entity';
import { CarsService } from 'src/app/cars.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.sass']
})
export class CarDetailsComponent implements OnInit {
  private _id: string
  car: ICar

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _carsService: CarsService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._id = params.id
      const car = this._carsService.getCarById(this._id)
      if (!car) { this._router.navigate(['/not-found'])}
      this.car = car!
    })
  }

}
