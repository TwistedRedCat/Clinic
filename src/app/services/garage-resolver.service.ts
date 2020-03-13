import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { GarageServices } from "./garage.service";
import { HttpService } from "./http.service";

@Injectable({ providedIn: "root" })
export class GarageResolverService implements Resolve<Observable<any> | any> {
  constructor(
    private garageService: GarageServices,
    private http: HttpService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {
    const items = this.garageService.items;

    if (items.length == 0) {
      return this.garageService.fetchProduct();
    } else {
      return items;
    }

    // subscribe(result => {
    //   this.garageService.items = result.products;
    //   this.http.isLoading.next(false);
    // });
  }
}
