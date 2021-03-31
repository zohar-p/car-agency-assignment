import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { ICar } from 'src/app/car.entity';
import { CarsService } from 'src/app/cars.service';
import { ActivatedRouteStub } from 'src/app/testing/activated-route.stub';
import { carMock } from 'src/app/testing/car.mock';
import { CarDetailsComponent } from './car-details.component';

class CarsServiceStub {
  getCarById(id: string): ICar | null {
    return id === carMock.id ? carMock : null
  }
}

describe('CarDetailsComponent', () => {
  let component: CarDetailsComponent;
  let fixture: ComponentFixture<CarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDetailsComponent ],
      imports: [ RouterTestingModule.withRoutes(routes) ],
      providers: [
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub({ id: '123'}) },
        { provide: CarsService, useClass: CarsServiceStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the car by id', () => {
    expect(component.car).toEqual(carMock)
  })

  // TODO BEFORE PR: change id param in test
  // it('should navigate to not found page if car is not found', () => {
  //   const location = TestBed.inject(Location)
  //   const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
  // })
});
