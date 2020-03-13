import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener
} from "@angular/core";

import Swal from "sweetalert2";

import { HttpService } from "../services/http.service";
import { Router } from "@angular/router";
import { GarageServices } from "../services/garage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild("a") el: ElementRef;
  @ViewChild("modal") modal: ElementRef;
  @ViewChild("b") el2: ElementRef;
  @ViewChild("box") box: ElementRef;
  @Output() isLoading = new EventEmitter();
  @Output() errorMsg = new EventEmitter<string>();

  @HostListener("document:click", ["$event"]) listenAuth(event: any) {
    const x = event.target.classList.contains("fa-user-times");
    const y = event.target.classList.contains("ico");
    const z = this.el.nativeElement.children[1].classList.length;
    const a = event.target.classList.contains("ham");
    const b = this.el2.nativeElement.classList.length;

    if (a && b === 2) {
      this.el2.nativeElement.classList.add("show");
    }
    if (a && b !== 2) {
      this.el2.nativeElement.classList.remove("show");
    }
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

  constructor(
    private httpService: HttpService,
    private router: Router,
    private garageService: GarageServices
  ) {}

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
    // const confirmation = confirm("Are you sure you want to sign out?");
    // if (confirmation) {
    //   this.httpService.logOut();
    // }
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!"
    }).then(result => {
      if (result.value) {
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        this.httpService.logOut();
      }
    });
  }

  onSpinner() {
    this.httpService.isLoading.next(true);
    this.garageService.fetchProduct().subscribe(result => {
      this.garageService.items = result;
      setTimeout(() => {
        this.router.navigate(["/garage-sale"]);
        this.httpService.isLoading.next(false);
      }, 500);
    });
  }
}
