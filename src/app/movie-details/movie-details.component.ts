import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers:[MovieService]
})
export class MovieDetailsComponent implements OnInit {

  movie:Movie;
  updateOpen: boolean;

  constructor(private movieService:MovieService,
              private activatedRouted:ActivatedRoute) { 
              }

  ngOnInit() {
    this.activatedRouted.params.subscribe(params=>{
      this.movieService.getMovieById(params["movieId"])
      .subscribe(data=>{
        this.movie=data;
      })
    })
  }

  update(updateBtn: any, title: any, desc: any){
    if (!this.updateOpen) {
      updateBtn.classList.remove("btn-warning");
      updateBtn.classList.add("btn-success");
      updateBtn.innerHTML = "Submit"
      this.updateOpen = true;
      title.disabled = false;
      desc.disabled = false;
    }
    else{
      updateBtn.classList.add("btn-warning");
      updateBtn.classList.remove("btn-success");
      updateBtn.innerHTML = "Update"
      this.updateOpen = false;
      title.disabled = true;
      desc.disabled = true;

      this.movieService.updateMovie(this.movie);
      setTimeout(() => {
        this.movieService.getMovieById(this.movie).subscribe(data => {
          this.movie = data;
        });
      }, 10);
    }
  }

  checkDataState(tag: any){
    console.log(tag.value);
    return{
      'border-danger': tag.value.length == 0
    };
  }

  deleteMovie(){
    this.movieService.deleteMovie(this.movie.id);
  }
}