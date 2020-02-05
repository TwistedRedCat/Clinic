import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { BlogsServices } from "./blogs.service";
import { Blog } from "../shared/blog.model";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class BlogsResolverService
  implements Resolve<Observable<Blog[]> | Blog[]> {
  constructor(private blogsService: BlogsServices, private http: HttpService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Blog[]> | Blog[] {
    const blogs = this.blogsService.blogResolver;
    const index = this.blogsService.activeIndex;

    if (blogs.length == 0 || index === undefined) {
      this.blogsService.activeBlog.next(route.params.id);
      return this.blogsService.getBlogs();
    } else {
      return blogs;
    }
  }
}
