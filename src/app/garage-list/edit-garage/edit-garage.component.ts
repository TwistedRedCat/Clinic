import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { GarageServices } from "src/app/services/garage.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-edit-garage",
  templateUrl: "./edit-garage.component.html",
  styleUrls: ["./edit-garage.component.css"]
})
export class EditGarageComponent implements OnInit {
  constructor(
    private garageService: GarageServices,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: FormGroup) {
    // if (form.invalid) {
    //   this.error.next("error occured");
    //   return;
    // }
    console.log(form.value);
    this.garageService.addProduct(form.value).subscribe(result => {
      console.log(result);
      this.router.navigate(["../"], { relativeTo: this.route });
    });
    // if (this.editMode) {
    //   this.blogsServices.updateBlog(this.n, form.value);
    // } else {
    //   this.blogsServices.addBlog(form.value);
    // }
  }
}
