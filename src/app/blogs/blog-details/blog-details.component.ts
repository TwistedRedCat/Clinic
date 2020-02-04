import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener
} from "@angular/core";
import { BlogsServices } from "../../services/blogs.service";
import { Blog } from "src/app/shared/blog.model";
import { ActivatedRoute, Router, Data } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-blog-details",
  templateUrl: "./blog-details.component.html",
  styleUrls: ["./blog-details.component.css"]
})
export class BlogDetailsComponent implements OnInit {
  @ViewChild("b", { static: false }) el: ElementRef;

  @HostListener("document:click", ["$event"]) listenEdit(event: any) {
    if (
      event.target.classList.contains("dropdown-toggle") &&
      this.el.nativeElement.classList.length === 1
    ) {
      console.log("click from button");
      this.el.nativeElement.classList.add("show");
    } else {
      this.el.nativeElement.classList.remove("show");
    }
  }

  text: string;
  blog = {};
  index: number;
  isLoggedIn = true;

  constructor(
    private blogServices: BlogsServices,
    private route: ActivatedRoute,
    private router: Router,
    private eRef: ElementRef
  ) {}

  ngOnInit() {
    this.index = +this.route.snapshot.params["id"];
    // this.blog = this.blogServices.getBlog(this.index);
    // console.log(a);
    this.blogServices.activeIndex = this.index;
    this.route.data.subscribe((data: Data) => {
      // this.blogs = Object.values(data["blog"]);
      const blogs = Object.values(data["blog"]);
      this.blog = blogs[this.index];
      this.blogServices.activeBlog.subscribe(res => {
        this.blog = res;
      });
    });
  }

  onClick(event: Event) {
    const box = confirm("are you sure you want to delete");
    if (box === true) {
      this.blogServices.deleteBlog(this.index).subscribe(result => {
        console.log(this.index);
        this.router.navigate(["../"], { relativeTo: this.route });
      });
    }
  }
}
