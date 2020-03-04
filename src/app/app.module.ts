import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { AppRoutingModule } from "./app-routing.module";
import { PhotolistComponent } from "./photolist/photolist.component";
import { GarageListComponent } from "./garage-list/garage-list.component";
import { HomeComponent } from "./home/home.component";
import { GarageDetailsComponent } from "./garage-list/garage-details/garage-details.component";
import { ShortenPipe } from "./shared/shorten.pipe";
import { BlogsComponent } from "./blogs/blogs.component";
import { BlogListComponent } from "./blogs/blog-list/blog-list.component";
import { BlogItemComponent } from "./blogs/blog-list/blog-item/blog-item.component";
import { EditBlogComponent } from "./blogs/edit-blog/edit-blog.component";
import { BlogDetailsComponent } from "./blogs/blog-details/blog-details.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner/loading-spinner.component";
import { AuthInterceptor } from "./services/http-interceptor.service";
import { AuthComponent } from "./auth/auth.component";
import { ReversePipe } from "./shared/reverse.pipe";
import { EditGarageComponent } from './garage-list/edit-garage/edit-garage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    PhotolistComponent,
    GarageListComponent,
    HomeComponent,
    GarageDetailsComponent,
    ShortenPipe,
    ReversePipe,
    BlogsComponent,
    BlogListComponent,
    BlogItemComponent,
    EditBlogComponent,
    BlogDetailsComponent,
    LoadingSpinnerComponent,
    AuthComponent,
    EditGarageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
