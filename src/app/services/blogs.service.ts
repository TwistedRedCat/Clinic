import { Injectable } from "@angular/core";
import { Blog } from "../shared/blog.model";
import { Subject } from "rxjs";
import { HttpService } from "./http.service";

@Injectable({ providedIn: "root" })
export class BlogsServices {
  blogsChanged = new Subject<Blog[]>();
  activeBlog = new Subject<Blog>();
  activeIndex: number;

  private blogs: Blog[] = [];

  constructor(private http: HttpService) {}

  get blogResolver() {
    return JSON.parse(JSON.stringify(this.blogs));
  }

  set blogList(val: any) {
    this.blogs = val;
    this.blogsChanged.next(val);
  }

  set test3(id: number) {
    this.activeIndex = id;
  }

  getBlogs() {
    return this.http.httpFetchBlogs();
  }

  getBlog(index: number) {
    this.activeIndex = index;
    return this.blogs[index];
  }

  addBlog(blog: Blog) {
    this.http.httpAddBlog(blog).subscribe(result => {
      console.log("success");
      this.blogs.reverse().push(blog);
      this.blogs.reverse();
      this.blogsChanged.next(this.blogs.slice());
    });
  }

  updateBlog(index: number, newBlog: Blog) {
    this.http.httpUpdateBlog(index, newBlog).subscribe(result => {
      this.blogs[index] = newBlog;
      this.activeBlog.next(this.blogs[index]);
    });
  }

  deleteBlog(index: number) {
    const a = this.http.httpDeleteBlog(index);
    this.blogs.splice(index, 1);
    this.blogsChanged.next(this.blogs.slice());
    return a;
  }
}
