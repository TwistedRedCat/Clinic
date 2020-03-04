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
  @ViewChild("a") el: ElementRef;
  @ViewChild("box") box: ElementRef;
  @Output() isLoading = new EventEmitter();
  @Output() errorMsg = new EventEmitter<string>();
  @HostListener("document:click", ["$event"]) listenAuth(event: any) {
    const x = event.target.classList.contains("fa-user-times");
    const y = event.target.classList.contains("ico");
    const z = this.el.nativeElement.children[1].classList.length;
    if ((x || y) && z === 1) {
      this.el.nativeElement.children[1].classList.add("show");
    } else {
      this.el.nativeElement.children[1].classList.remove("show");
    }
  }

  @HostListener("window:scroll", []) myScroll() {
    this.sticky = +this.box.nativeElement.offsetTop;
    if (window.pageYOffset > this.sticky) {
      this.box.nativeElement.classList.add("sticky");
    } else {
      this.box.nativeElement.classList.remove("sticky");
    }
  }

  sticky: number;

  isLoggedIn = false;
  loadStatus = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.isLoggedIn = this.httpService.activatedUser;
    this.httpService.userActive.subscribe(status => {
      this.isLoggedIn = status;
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
