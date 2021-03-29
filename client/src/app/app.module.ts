import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { CarDetailsComponent } from './component/car-details/car-details.component';
import { CarItemComponent } from './component/car-item/car-item.component';

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
