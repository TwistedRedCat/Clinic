import { Component, OnInit, DoCheck } from "@angular/core";
import { GarageItem } from "../shared/GarageItem.model";
import { GarageServices } from "../services/garage.service";
import { Subscription } from "rxjs";
import { Data, ActivatedRoute } from "@angular/router";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-garage-list",
  templateUrl: "./garage-list.component.html",
  styleUrls: ["./garage-list.component.css"]
})
export class GarageListComponent implements OnInit {
  items: GarageItem[] = [];
  itemSub: Subscription;

  constructor(
    private garageService: GarageServices,
    private route: ActivatedRoute,
    private http: HttpService
  ) {}

  ngOnInit() {
    this.itemSub = this.route.data.subscribe((data: Data) => {
      this.items = data["item"].products;
      // console.log(this.items);
    });

    // console.log("aadsfsdfdsfdsffsfds");
    // this.items = this.garageService.items;
    // this.http.isLoading.next(false);

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
