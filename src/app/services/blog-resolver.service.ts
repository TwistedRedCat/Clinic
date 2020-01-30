import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from "@angular/router";
import { BlogsServices } from "./blogs.service";
import { Blog } from "../shared/blog.model";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class BlogsResolverService
  implements Resolve<Observable<Blog[]> | Blog[]> {
  constructor(private blogsService: BlogsServices, private http: HttpService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Blog[]> | Blog[] {
    const blogs = this.blogsService.test;
    const index = this.blogsService.activeIndex;

    console.log(route.params.id);

    if (blogs.length == 0 || index === undefined) {
      this.blogsService.activeBlog.next(route.params.id);
      return this.blogsService.getBlogs();
      // return blogs;
    } else {
      return blogs;
    }

    // if (index === undefined) {
    //   return this.blogsService.getBlog();
    // }
  }
}
