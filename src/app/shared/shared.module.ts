import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
//shared Components
import { WeatherDetailsPage } from './components/weather-details/weather-details.page';
import { SearchPage } from './components/search/search.page';
import { PopoverComponent } from './components/popover/popover.component';
//material Modules

@NgModule({
  declarations: [WeatherDetailsPage, SearchPage, PopoverComponent],
  imports: [CommonModule, FormsModule, IonicModule], //here material modules
  exports: [WeatherDetailsPage, SearchPage, PopoverComponent], //here material modules
  providers: [DatePipe, DecimalPipe],
})
export class SharedModule {}
