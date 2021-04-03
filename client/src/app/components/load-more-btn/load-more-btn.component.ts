import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/cars.service';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrls: ['./load-more-btn.component.sass']
})
export class LoadMoreBtnComponent implements OnInit {
  isLoading: boolean = false

  constructor(
    private _carsService: CarsService
  ) { }

  ngOnInit(): void {
    this._carsService.isLoading$.subscribe(isLoading => this.isLoading = isLoading)
  }

  onLoadMore() {
    this._carsService.onLoadMore()
  }

}
