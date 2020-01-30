import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import { map, take } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthRouteGuardService implements CanActivate {
  constructor(private httpService: HttpService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.httpService.user.pipe(
      take(1),
      map(user => {
        const userActive = !user ? false : true;
        if (userActive) {
          return true;
        }
        return this.router.createUrlTree(["/"]);
      })
    );
  }
}
