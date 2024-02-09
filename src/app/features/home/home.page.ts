import { Component, OnInit } from '@angular/core';
import { IWeatherData } from 'src/app/core/models';
import { WeatherService } from 'src/app/services/weather.service';
import { DatePipe } from '@angular/common';
import { weatherIcons } from 'src/app/core/constants';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  weatherData!: any;
  getDate: string = '';
  WeatherIcons = weatherIcons;
  isCelsius: boolean = true;
  isFavorite!: boolean;
  units: string = 'metric';
  searchTerm: string = '';
  loadder: boolean = true;
  favArray: any[] = [];
  recentSearchArray: any[] = [];
  constructor(
    private weatherService: WeatherService,
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) {
    this.getDate = this.getCurrentDate();
  }

  ngOnInit() {
    this.searchTerm = this.weatherService.getSearchTerm();
    if (this.searchTerm === '') {
      this.getWeatherData('metric', 'udupi');
    }
    this.route.queryParams.subscribe((params) => {
      const newSearchTerm = params['searchTerm'];

      if (newSearchTerm) {
        this.searchTerm = newSearchTerm;
        this.weatherService.setSearchTerm(newSearchTerm);
        console.log(this.searchTerm, newSearchTerm);
        this.getWeatherData('metric', this.searchTerm);

        // if (this.weatherData) {
        //   const search = this.searchTerm?.toLowerCase();
        //   const index = this.recentSearchArray.findIndex(
        //     (item) => item.name.toLowerCase() === search
        //   );
        //   if (index === -1) {
        //     this.recentSearchArray.push(this.weatherData);
        //     localStorage.setItem(
        //       'recent',
        //       JSON.stringify(this.recentSearchArray)
        //     );
        //   }
        // }
      }
    });
  }

  search() {
    // this.searchTerm = '';
  }

  getCurrentDate(): any {
    const currentDate = new Date();
    return this.datepipe.transform(currentDate, 'EEE, dd MMM yyyy hh:mm a');
  }

  async getWeatherData(units: string, searchTerm: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circles',
    });
    await loading.present();
    console.log(units, searchTerm);
    this.weatherService.getWeatherData(units, searchTerm).subscribe({
      next: (res) => {
        this.weatherData = res;
        loading.dismiss();

        //testing 1
        const data = localStorage.getItem('favorite') || '';
        let localfavData = [];
        if (data !== '') {
          localfavData = JSON.parse(data);
        }
        console.log(localfavData);
        this.isFavorite = localfavData.some((item: any) => {
          console.log(
            item.name?.toLowerCase(),
            this.weatherData?.name?.toLowerCase()
          );
          return (
            item.name?.toLowerCase() === this.weatherData?.name?.toLowerCase()
          );
        });

        console.log(this.isFavorite, this.favArray);

        //testing 2
        if (this.weatherData) {
          const index = this.recentSearchArray.findIndex(
            (item) => item.name === this.weatherData.name
          );
          if (index === -1) {
            this.recentSearchArray.push(this.weatherData);
          }

          localStorage.setItem(
            'recent',
            JSON.stringify(this.recentSearchArray)
          );
        }
      },
      error: (err) => {
        loading.dismiss();
        //alert(err.error.message);
        console.log(err.error.message);
      },
    });
  }

  toggleUnits() {
    this.isCelsius = !this.isCelsius;
    if (this.isCelsius) {
      if (this.searchTerm === '') {
        this.getWeatherData('metric', 'udupi');
      } else {
        this.getWeatherData('metric', this.searchTerm);
      }
    } else {
      if (this.searchTerm === '') {
        this.getWeatherData('imperial', 'udupi');
      } else {
        this.getWeatherData('imperial', this.searchTerm);
      }
    }
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      const index = this.favArray.findIndex(
        (item) => item.name === this.weatherData.name
      );
      if (index === -1) {
        this.favArray.push(this.weatherData);
      }
    } else {
      const index = this.favArray.findIndex(
        (item) => item.name === this.weatherData.name
      );
      if (index !== -1) {
        this.favArray.splice(index, 1);
      }
    }
    localStorage.setItem('favorite', JSON.stringify(this.favArray));
  }

  getWeatherIcon(): any {
    const weatherIconId = this.weatherData?.weather[0]?.icon;
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
