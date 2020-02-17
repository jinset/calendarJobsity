import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  key: string = '1b730ec85c30bd34619451fbbe2bcded';

  constructor(private http: HttpClient) {

  }
  searchWeatherData(cityName: string, start: number): Observable<any> {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.key}&units=metric&type=hour&start=${start}&cnt=1`;
    return this.http.get<any>(url);
  }

}
