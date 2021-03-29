import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
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
