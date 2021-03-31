import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ICar } from 'src/app/car.entity';
import { CarsService } from 'src/app/cars.service';
import { CarsListComponent } from './cars-list.component';

class CarsServiceStub {
  cars$ = new Subject<ICar[]>()

  getCars(): ICar[] {
    return []
  }

  fetchCars() {}
}

describe('CarsListComponent', () => {
  let component: CarsListComponent;
  let fixture: ComponentFixture<CarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsListComponent ],
      providers: [
        { provide: CarsService, useClass: CarsServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch cars on init', waitForAsync(() => {
    const carsService = fixture.debugElement.injector.get(CarsService)
    spyOn(carsService, 'fetchCars')
    component.ngOnInit()
    expect(carsService.fetchCars).toHaveBeenCalledTimes(1)
  }))

});
