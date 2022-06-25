import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService]
})
export class CategoryCreateComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  createCategory(name: string){
    if (name.length == 0) {
      alert("Please enter category name.");
      return;
    }

    var category = {
      "name": name      
    };

    this.categoryService.createCategory(category)
      .subscribe(data=>this.router.navigate(['/movies']));

    setTimeout(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(['/'], {
        relativeTo: this.route,
        queryParamsHandling: "merge"
      });
    }, 400);
  }

}
