import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieContractService } from '../services/movie-contract.service';
import { MovieService } from '../services/movie.service';
import { NotificationService } from '../services/notification.service';
import { Web3Service } from '../services/web3.service';

export class Movie {
  id: number;
  poster_path: string;
  title: string;
  rating_average: string;
  total_rating: string;
  release_date: string;
  first_air_date: string;
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies: Movie[] = [];
  movieRating: any;
  accounts: any;
  account: any;
  loading = false;

  constructor(
    private movieService: MovieService,
    private movieContract: MovieContractService,
    private router: Router,
    private web3Ser: Web3Service,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.getMovieFromContract();
    this.web3Ser.getAccounts().subscribe(response => {
      this.accounts = response;
      this.account = this.accounts[0];
    });
  }

  getPopularMovies(page: number) {
    this.movieService.getPopular(page).subscribe(res => {
      this.movies = res.results;
    });
  }

  getMovieFromContract() {
    this.loading = true;
    this.movieContract.getMovies().subscribe(response => {
      const movies = response;

      for (const [i, movie] of movies.entries()) {
        this.movieContract.getMovieRatings(i).subscribe(res => {
          const totalRater = res.totalRater;
          const totalRating = res.totalRating;
          let ratingAverage = 0;
          if (parseInt(totalRater) !== 0) {
            ratingAverage = parseInt(totalRating) / parseInt(totalRater);
          }

          this.movieService.searchMovies(movie, 1).subscribe(resp => {
            const m = new Movie();
            m.total_rating = totalRater;
            m.rating_average = ratingAverage.toFixed(2);
            m.title = resp.results[0].title;
            m.poster_path = resp.results[0].poster_path;
            this.movies.push(m);
            this.loading = false;
          });
        });
      }
    }, error => {
      this.notificationService.openErrorSnackBar('Error loading movie list');
      console.error(error);
      this.loading = false;
    });
  }

  updateRate(id, value) {
    this.loading = true;
    this.movieContract.rateMovie(id, value, this.account).subscribe(res => {
      this.reloadComponent();
      this.loading = false;
      this.notificationService.openSuccessSnackBar('Your vote has been successfully recorded');
    }, error => {
      this.notificationService.openErrorSnackBar('Error occurred during vote');
      console.error(error);
      this.loading = false;
    });
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/movie']);
  }
}
