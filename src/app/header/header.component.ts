import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
  HostListener
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
  @ViewChild("a", { static: false }) el: ElementRef;
  @Output() isLoading = new EventEmitter();
  @Output() errorMsg = new EventEmitter<string>();
  @HostListener("document:click", ["$event"]) listenAuth(event: any) {
    const x = event.target.classList.contains("fa-user-times");
    const y = event.target.classList.contains("ico");
    const z = this.el.nativeElement.children[1].classList.length;
    if ((x || y) && z === 1) {
      console.log(this.el);
      this.el.nativeElement.children[1].classList.add("show");
    } else {
      this.el.nativeElement.children[1].classList.remove("show");
    }
  }

  isLoggedIn = false;
  loadStatus = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.isLoggedIn = this.httpService.activatedUser;
    console.log(this.isLoggedIn);
    this.httpService.userActive.subscribe(status => {
      this.isLoggedIn = status;
      console.log("user is logged In");
    });
  }

  ngOnDestroy() {}

  signIn(bool: boolean) {
    this.httpService.authSignIn.next(bool);
    this.el.nativeElement.children[1].classList.remove("show");
  }

  onLogOut() {
    const confirmation = confirm("Are you sure you want to sign out?");
    if (confirmation) {
      this.httpService.logOut();
    }
  }
}
