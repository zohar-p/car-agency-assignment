import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { CarItemComponent } from './components/car-item/car-item.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarsDisplayFormComponent } from './components/cars-display-form/cars-display-form.component';
import { SortFormComponent } from './components/sort-form/sort-form.component';
import { SortPipe } from './pipes/sort/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CarDetailsComponent,
    CarItemComponent,
    NotFoundComponent,
    CarsListComponent,
    HomeComponent,
    CarsDisplayFormComponent,
    SortFormComponent,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
