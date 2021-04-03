import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICar } from 'src/app/car.entity';
import { CarsService } from 'src/app/services/cars.service';

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
    this.getCar()
  }

  getCar() {
    this._route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (!id) { this._router.navigate(['/not-found'])}
      this._id = id!
      const car = this._carsService.getCar(this._id)
      if (!car) { this._router.navigate(['/not-found'])}
      this.car = car!
    })
  }

}
