import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PhotolistComponent } from "./photolist/photolist.component";
import { HomeComponent } from "./home/home.component";
import { GarageDetailsComponent } from "./garage-list/garage-details/garage-details.component";
import { GarageListComponent } from "./garage-list/garage-list.component";
import { BlogsComponent } from "./blogs/blogs.component";
import { EditBlogComponent } from "./blogs/edit-blog/edit-blog.component";
import { BlogDetailsComponent } from "./blogs/blog-details/blog-details.component";
import { BlogsResolverService } from "./services/blog-resolver.service";
import { AuthRouteGuardService } from "./services/authRouteGuard.service";
import { AuthComponent } from "./auth/auth.component";
import { EditGarageComponent } from "./garage-list/edit-garage/edit-garage.component";
import { GarageResolverService } from "./services/garage-resolver.service";
import { ErrorHandlerComponent } from "./error-handler/error-handler.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "auth", component: AuthComponent },
  {
    path: "blogs",
    component: BlogsComponent,
    canActivate: [AuthRouteGuardService],
    resolve: { blog: BlogsResolverService }
  },
  { path: "blogs/new", component: EditBlogComponent },
  {
    path: "blogs/:id",
    component: BlogDetailsComponent,
    resolve: { blog: BlogsResolverService },
    children: [{ path: "edit", component: EditBlogComponent }]
  },
  { path: "garage-sale/new", component: EditGarageComponent },
  {
    path: "garage-sale",
    component: GarageListComponent,
    resolve: { item: GarageResolverService },
    children: [{ path: "details", component: GarageDetailsComponent }]
  },
  {
    path: "photo",
    component: PhotolistComponent,
    canActivate: [AuthRouteGuardService]
  },
  { path: "error", component: ErrorHandlerComponent },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
