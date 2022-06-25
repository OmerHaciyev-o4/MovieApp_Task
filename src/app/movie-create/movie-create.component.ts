import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { AlertifyService } from '../services/alertify.services';
import { CategoryService } from '../services/category.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers:[CategoryService,MovieService,AlertifyService]
})
export class MovieCreateComponent implements OnInit {
  categories:Category[];
  constructor(private categoryService:CategoryService,
    private movieService:MovieService,
    private alertifyService:AlertifyService,
    private router:Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    });
  }

  createMovie(title:any,description:any,imageUrl:any,categoryId:any){
    if(title.value==""){
      this.alertifyService.error("You should write title");
      return;
    }
    if(title.value.length<5){
      this.alertifyService.warning("you should write at least 5 characters");
      return;
    }
    if(description.value==""){
      this.alertifyService.error("You should write description");
      return;
    }
    if(imageUrl.value==""){
      this.alertifyService.error("You should write imageUrl");
      return;
    }
    if(categoryId.value=="-1"){
      this.alertifyService.error("You should write category");
      return;
    }
 
    const movie = {
      title:title.value,
      description:description.value,
      imageUrl:imageUrl.value,
      isPopular:false,
      datePublished:new Date().getTime(),
      categoryId:categoryId.value
    };

      this.movieService.createMovie(movie)
      .subscribe(data=>this.router.navigate(['/movies',data.id]));


  }

}
