import { Component, OnInit } from '@angular/core';
import { weatherIcons } from 'src/app/core/constants';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/shared/components/popover/popover.component';

@Component({
  selector: 'app-favorite',
  templateUrl: 'favorite.page.html',
  styleUrls: ['favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  favData: any[] = [];
  WeatherIcons = weatherIcons;
  noData: boolean = true;
  constructor(private popoverController: PopoverController) {}

  ngOnInit() {
    const data = localStorage.getItem('favorite') || '';
    if (data !== '') {
      this.favData = JSON.parse(data);
    }
    if (this.favData.length !== 0) {
      this.noData = false;
    }
  }

  removeAll() {
    localStorage.removeItem('favorite');
    this.favData = [];
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

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'auto-height-for-cart-popup',
      event: ev,
      translucent: true,
      componentProps: {
        removeAll: this.removeAll.bind(this),
      },
    });
    return await popover.present();
  }
}
