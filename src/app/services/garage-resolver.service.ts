import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { GarageServices } from "./garage.service";

@Injectable({ providedIn: "root" })
export class GarageResolverService implements Resolve<Observable<any> | any> {
  constructor(private garageService: GarageServices) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {
    const item = this.garageService.fetchProduct();
    return item;
  }
}
