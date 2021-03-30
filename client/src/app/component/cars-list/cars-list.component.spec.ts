import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsListComponent } from './cars-list.component';

describe('HomeComponent', () => {
  let component: CarsListComponent;
  let fixture: ComponentFixture<CarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title', () => {
    // TODO BEFORE PR: Consider removing
    expect(
      fixture.nativeElement.querySelector('h1').textContent
    ).toBe('Our Cars')
  });

  it('should fetch cars on init', () => {
    // TODO BEFORE PR: implement
  })

  it('should navigate to car details page when a car is clicked')
});
