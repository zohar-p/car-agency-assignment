import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ICar } from 'src/app/car.entity';
import { CarsService } from 'src/app/cars.service';
import { CarDetailsComponent } from './car-details.component';

class CarsServiceStub {
  getCarById(id: string): ICar {
    return { id: '123', type: 'Hatchback', brand: 'Suzuki', model: 'Splash', year: '2014', price: '2000000' }
  }
}

describe('CarDetailsComponent', () => {
  let component: CarDetailsComponent;
  let fixture: ComponentFixture<CarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDetailsComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: CarsService, useClass: CarsServiceStub }
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
});
