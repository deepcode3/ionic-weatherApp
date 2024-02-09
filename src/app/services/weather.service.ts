import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeatherData } from '../core/models';
import { environment } from 'src/environments/environment';
import { ApiEndPoints } from '../core/constants';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private searchTerm: string = '';

  constructor(private http: HttpClient) {}

  setSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  getSearchTerm() {
    return this.searchTerm;
  }

  getWeatherData(units: string, place: string): Observable<IWeatherData> {
    return this.http.get<IWeatherData>(
      `${environment.baseURL}${ApiEndPoints.getAllData}?appid=${environment.accessKey}&q=${place}&units=${units}`
    );
  }
}
