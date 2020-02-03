import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  SimpleChange,
  SimpleChanges
} from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { HttpService, AuthResponse } from "../services/http.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  authSub: Subscription;

  authSignIn = true;
  loadStatus = false;
  authType = "SignIn";

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.route.snapshot.queryParams["type"] != "signin") {
      this.authSignIn = false;
      this.authType = "SignUp";
    }
    this.httpService.authSignIn.subscribe(bool => {
      this.authSignIn = bool;
      this.authType = this.authSignIn ? "SignIn" : "SignUp";
    });
  }

  onSubmit(form: NgForm, buttonType: string) {
    const email = form.value.email;
    const password = form.value.password;
    const confirmPassword = form.value.retypepassword;
    if (!form.valid) {
      this.httpService.errorMsg.next("Form Invalid");
      return;
    }

    this.loadStatus = true;

    let obs: Observable<AuthResponse>;

    if (buttonType === "SignIn") {
      obs = this.httpService.httpSignIn(email, password);
    } else {
      obs = this.httpService.httpSignUP(email, password);
    }

    obs.subscribe(
      resData => {
        setTimeout(() => {
          this.loadStatus = false;
          this.httpService.isLoading.next(this.loadStatus);
          this.httpService.errorMsg.next(null);
          this.router.navigate(["/"]);
        }, 1000);
      },
      error => {
        setTimeout(() => {
          this.loadStatus = false;
          this.httpService.isLoading.next(this.loadStatus);
          this.httpService.errorMsg.next(error);
          this.router.navigate(["/"]);
        }, 1000);
      }
    );

    this.httpService.isLoading.next(this.loadStatus);

    form.reset();
  }
}
