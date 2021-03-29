import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarItemComponent } from './car-item/car-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarDetailsComponent,
    CarItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
