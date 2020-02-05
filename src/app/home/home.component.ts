import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { WeatherHttp } from "../services/http-weather.service";
import { Weather } from "../shared/weather.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  sub0: Subscription;
  weather: Weather;

  constructor(private weatherService: WeatherHttp) {}

  ngOnInit() {
    this.sub0 = this.weatherService.httpFetchWeather().subscribe(result => {
      const celcius = +(result.main.temp - 273.15).toFixed(2);
      this.weather = new Weather(
        result.name,
        celcius,
        result.weather[0].description
      );
      if ((<any>window).twttr) {
        setTimeout(() => {
          (<any>window).twttr.widgets.load();
        }, 500);
      }
    });
  }

  ngOnDestroy() {
    this.sub0.unsubscribe();
  }
}
