import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";

import { NgForm } from "@angular/forms";
import { HttpService, AuthResponse } from "../services/http.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild("s", { static: false }) el: ElementRef;
  @Output() isLoading = new EventEmitter();
  @Output() errorMsg = new EventEmitter<string>();

  authSub: Subscription;

  isAuthenticated = false;

  loadStatus = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.authSub = this.httpService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  toggleOpen(event: any) {
    if (
      this.el.nativeElement.children[1].classList.length > 1 &&
      event.target
    ) {
      this.el.nativeElement.children[1].classList.remove("show");
      return;
    }
    this.el.nativeElement.children[1].classList.add("show");
  }

  onSubmit(form: NgForm, buttonType: string) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.loadStatus = true;

    let obs: Observable<AuthResponse>;

    if (buttonType === "LogIn") {
      obs = this.httpService.httpSignIn(email, password);
    } else {
      obs = this.httpService.httpSignUP(email, password);
    }

    obs.subscribe(
      resData => {
        setTimeout(() => {
          this.loadStatus = false;
          this.isLoading.emit(this.loadStatus);
          this.errorMsg.emit(null);
        }, 1000);
      },
      error => {
        setTimeout(() => {
          this.loadStatus = false;
          this.errorMsg.emit(error);
          this.isLoading.emit(this.loadStatus);
        }, 1000);
      }
    );

    this.isLoading.emit(this.loadStatus);

    form.reset();
  }

  onLogOut() {
    this.httpService.logOut();
  }
}
