import { Component, OnInit, OnChanges } from "@angular/core";
import { Subscription } from "rxjs";
import { HttpService } from "./services/http.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnChanges {
  spinner: boolean;
  errorMsg: string = null;

  constructor(private httpService: HttpService) {}

  ngOnChanges() {}

  ngOnInit() {
    this.httpService.autoLogin();
  }
}
