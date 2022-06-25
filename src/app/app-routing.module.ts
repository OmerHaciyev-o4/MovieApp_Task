import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryComponent } from './category/category.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';


const routes:Routes=[
  {path:'movies',component:MoviesComponent},
  {path:'movies/category/:categoryId',component:MoviesComponent},
  {path:'movies/create/movie',component:MovieCreateComponent},
  {path:'movies/create/category',component:CategoryCreateComponent},
  {path:'movies/:movieId',component:MovieDetailsComponent},
  {path:'',redirectTo:'movies',pathMatch:'full'},
]
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
