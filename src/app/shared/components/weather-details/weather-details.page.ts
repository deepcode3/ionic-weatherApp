import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.page.html',
  styleUrls: ['./weather-details.page.scss'],
})
export class WeatherDetailsPage implements OnInit {
  @Input() weatherData: any;
  details: any[] = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weatherData']) {
      this.Details();
    }
  }

  Details() {
    this.details = [
      {
        icon: 'icon_temperature_info',
        name: 'Min - Max',
        value: `${this.weatherData?.main?.temp_min} - ${this.weatherData?.main?.temp_max}`,
      },
      {
        icon: 'icon_rainy_cloud_2',
        name: 'Precipitation',
        value: `${this.weatherData?.main?.sea_level % 100}%`,
      },
      {
        icon: 'icon_water_drop',
        name: 'Humidity',
        value: `${this.weatherData?.main?.humidity}`,
      },
      {
        icon: 'icon_wind_info_2',
        name: 'Wind',
        value: `${this.weatherData?.wind?.speed}%`,
      },
    ];
  }
}
