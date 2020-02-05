import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class WeatherHttp {
  constructor(private http: HttpClient) {}

  httpFetchWeather() {
    return this.http.get<any>(
      "https://api.openweathermap.org/data/2.5/weather?q=Kuala Lumpur&appid=b9443c09737879d8c31ad263e4e37b4e"
    );
  }
}
