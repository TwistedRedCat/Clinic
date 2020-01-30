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
    this.items = this.garageService.items;
    // const tbl = document.getElementsByTagName("table")[0];
    // const tr = tbl.getElementsByTagName("tr");
    // for (let i = 0; i < this.items.length; i++) {
    //   const td = document.createElement("td");
    //   td.innerHTML
    //   tr[i].appendChild(td);
    //   console.log(tr);
    // }
  }
}
