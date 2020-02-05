import { Component, OnInit, OnChanges, OnDestroy } from "@angular/core";
import { HttpService } from "./services/http.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  spinner: boolean;
  errorMsg: string = null;
  sub0: Subscription;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.autoLogin();
    this.sub0 = this.httpService.isLoading.subscribe(result => {
      this.spinner = result;
    });
    this.httpService.errorMsg.subscribe(result => {
      this.errorMsg = result;
    });
  }

  ngOnDestroy() {
    this.sub0.unsubscribe();
  }
}
