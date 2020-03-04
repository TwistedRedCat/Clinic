import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { BlogsServices } from "src/app/services/blogs.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Blog } from "src/app/shared/blog.model";

@Component({
  selector: "app-edit-blog",
  templateUrl: "./edit-blog.component.html",
  styleUrls: ["./edit-blog.component.css"]
})
export class EditBlogComponent implements OnInit {
  @ViewChild("title") titleInput: string;
  @ViewChild("post") postInput: string;
  @ViewChild("imageUrl") imageUrlInput: string;
  blog = {} as Blog;
  err = null;
  editMode = false;
  abc: string;
  n: number;

  constructor(
    private httpService: HttpService,
    private blogsServices: BlogsServices,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const path = this.route.snapshot.url[0].path;
    if (path === "edit") {
      this.editMode = true;
      this.n = this.blogsServices.activeIndex;
      this.blog = this.blogsServices.getBlog(this.n);
    }
  }

  onSubmit(form: FormGroup) {
    // const title = f;
    if (form.invalid) {
      this.err = "error occured";
      return;
    }

    if (this.editMode) {
      this.blogsServices.updateBlog(this.n, form.value);
    } else {
      this.blogsServices.addBlog(form.value);
    }

    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
