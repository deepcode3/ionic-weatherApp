import { Component, OnInit } from '@angular/core';
import { weatherIcons } from 'src/app/core/constants';

@Component({
  selector: 'app-tab3',
  templateUrl: 'recent.page.html',
  styleUrls: ['recent.page.scss'],
})
export class RecentPage implements OnInit {
  recentData: any[] = [];
  WeatherIcons = weatherIcons;
  noData: boolean = true;
  favData: any[] = [];

  constructor() {}

  ngOnInit() {
    const datafav = localStorage.getItem('favorite') || '';
    if (datafav !== '') {
      this.favData = JSON.parse(datafav);
    }

    const data = localStorage.getItem('recent') || '';
    if (data !== '') {
      this.recentData = JSON.parse(data);
      this.recentData.forEach((item: any) => {
        item['isFavorite'] = false;
      });

      this.favData.forEach((favItem) => {
        const matchingItem = this.recentData.find(
          (recentItem) => recentItem.name === favItem.name
        );
        if (matchingItem) {
          matchingItem.isFavorite = true;
        }
      });
      console.log(this.recentData);
    }

    if (this.recentData.length !== 0) {
      this.noData = false;
    }
  }

  clearAll() {
    localStorage.removeItem('recent');
    this.recentData = [];
    this.noData = true;
  }

  getWeatherIcon(weatherData: any): any {
    const weatherIconId = weatherData?.weather[0]?.icon;
    if (!weatherIconId) {
      return '';
    }
    const matchingIcon = this.WeatherIcons.find((icon: any) =>
      icon.id.includes(weatherIconId)
    );
    return matchingIcon
      ? `../../../assets/icon/${matchingIcon.icon1}.png`
      : `../../../assets/icon/${this.WeatherIcons[0].icon1}.png`;
  }
}
