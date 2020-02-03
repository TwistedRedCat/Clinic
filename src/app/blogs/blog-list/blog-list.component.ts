import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from "@angular/core";
import { Router, ActivatedRoute, Data } from "@angular/router";
import { Subscription } from "rxjs";

import { Blog } from "src/app/shared/blog.model";
import { HttpService } from "src/app/services/http.service";
import { BlogsServices } from "src/app/services/blogs.service";

@Component({
  selector: "app-blog-list",
  templateUrl: "./blog-list.component.html",
  styleUrls: ["./blog-list.component.css"]
})
export class BlogListComponent implements OnInit, OnChanges, OnDestroy {
  blogs: Blog[];
  blogsToReverse: Blog[];
  isLoggedIn = true;
  componentSub: Subscription;

  constructor(
    private blogService: BlogsServices,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log("On changes called");
  }

  ngOnInit() {
    this.componentSub = this.route.data.subscribe((data: Data) => {
      this.blogs = Object.values(data["blog"]);
      console.log(data);
      this.blogService.blogList = this.blogs;
    });
  }

  ngOnDestroy() {
    this.componentSub.unsubscribe();
  }

  onNewBlog() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
