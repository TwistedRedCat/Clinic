import { Component, OnInit, Input } from "@angular/core";

import { Blog } from "src/app/shared/blog.model";

@Component({
  selector: "app-blog-item",
  templateUrl: "./blog-item.component.html",
  styleUrls: ["./blog-item.component.css"]
})
export class BlogItemComponent implements OnInit {
  @Input() blog: Blog;
  @Input() index: number;

  ngOnInit() {}
}
