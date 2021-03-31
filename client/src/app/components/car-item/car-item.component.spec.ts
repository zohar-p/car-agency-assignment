import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CarItemComponent } from './car-item.component';
import { routes } from '../../app-routing.module'
import { Location } from '@angular/common';

describe('CarItemComponent', () => {
  let component: CarItemComponent;
  let fixture: ComponentFixture<CarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarItemComponent ],
      imports: [ RouterTestingModule.withRoutes(routes) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarItemComponent);
    component = fixture.componentInstance;
    component.car = { id: '123', type: 'Hatchback', brand: 'Suzuki', model: 'Splash', year: '2014', price: '2000000' }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to car details page when a car is clicked', waitForAsync(() => {
    const location = TestBed.inject(Location)
    expect(location.path()).toBe('')
    const link = fixture.debugElement.nativeElement.querySelector('a')
    link.click()
    fixture.whenStable().then(() => expect(location.path()).toBe('/cars/123'))
  }))

});
