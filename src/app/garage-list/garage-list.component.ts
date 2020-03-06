import { Component, OnInit } from "@angular/core";
import { GarageItem } from "../shared/GarageItem.model";
import { GarageServices } from "../services/garage.service";
import { Subscription } from "rxjs";
import { Data, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-garage-list",
  templateUrl: "./garage-list.component.html",
  styleUrls: ["./garage-list.component.css"]
})
export class GarageListComponent implements OnInit {
  items: GarageItem[];
  itemSub: Subscription;

  constructor(
    private garageService: GarageServices,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.itemSub = this.route.data.subscribe((data: Data) => {
      console.log(data);
      this.items = data["item"].products;
    });
    // this.garageService.fetchProduct().subscribe(result => {
    //   const x = Object.values(result);
    //   console.log(x);
    //   this.items = x[1];
    // });
  }

  ngOnDestroy() {
    this.itemSub.unsubscribe();
  }
}
