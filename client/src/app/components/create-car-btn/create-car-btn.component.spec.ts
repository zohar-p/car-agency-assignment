import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarBtnComponent } from './create-car-btn.component';

describe('CreateCarBtnComponent', () => {
  let component: CreateCarBtnComponent;
  let fixture: ComponentFixture<CreateCarBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCarBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
