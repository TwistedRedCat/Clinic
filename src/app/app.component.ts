import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterContentInit
} from "@angular/core";
import { HttpService } from "./services/http.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy, AfterContentInit {
  spinner: boolean = false;
  errorMsg: string = null;
  sub0: Subscription;
  sub1: Subscription;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.autoLogin();
    this.sub0 = this.httpService.isLoading.subscribe(result => {
      this.spinner = result;
    });
    this.sub1 = this.httpService.errorMsg.subscribe(result => {
      this.errorMsg = result;
      console.log(this.errorMsg);
    });
  }

  ngAfterContentInit() {
    console.log("aftercontentinit is called");
  }

  ngOnDestroy() {
    this.sub0.unsubscribe();
    this.sub1.unsubscribe();
  }
}
