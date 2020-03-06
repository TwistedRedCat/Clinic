import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-error-handler",
  templateUrl: "./error-handler.component.html",
  styleUrls: ["./error-handler.component.css"]
})
export class ErrorHandlerComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 5000);
  }
}
