import { Component, OnInit } from "@angular/core";
import { GarageItem } from "../shared/GarageItem.model";
import { GarageServices } from "../services/garage.service";

@Component({
  selector: "app-garage-list",
  templateUrl: "./garage-list.component.html",
  styleUrls: ["./garage-list.component.css"]
})
export class GarageListComponent implements OnInit {
  items: GarageItem[];

  constructor(private garageService: GarageServices) {}

  ngOnInit() {
    this.garageService.httpFetchProduct().subscribe(result => {
      const x = Object.values(result);
      this.items = x[1];
    });
  }
}
