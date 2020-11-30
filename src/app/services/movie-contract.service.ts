import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Web3Service } from './web3.service';
declare var require: any;
const movieContractArtifacts = require('../../contract/MovieRating.json');

@Injectable({
  providedIn: 'root'
})
export class MovieContractService {

  MovieRating: any;

  constructor(
    private web3Ser: Web3Service
  ) {
    const deployedNetwork = movieContractArtifacts.networks[3];
    this.MovieRating = new this.web3Ser.web3.eth.Contract(
      movieContractArtifacts.abi,
      deployedNetwork && deployedNetwork.address,
    );

    // this.MovieRating = new this.web3Ser.web3.eth.Contract(movieContractArtifacts);
    // this.MovieRating.setProvider(web3Ser.web3.currentProvider);
  }

  getMovies(): any {
    return new Observable(observer => {
      this.MovieRating.methods.getMovies().call()
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  addMovie(movieName, account): any {
    return new Observable(observer => {
      this.MovieRating.methods.add(movieName).send({from: account}).then(value => {
        observer.next(value);
        observer.complete();
      }).catch(e => {
        console.log(e);
        observer.error(e);
      });
    });
  }

  getMovieRatings(movieId: number): any {
    return new Observable(observer => {
      this.MovieRating.methods.movieRatings(movieId).call()
        .then(value => {
          observer.next(value);
          observer.complete();
        })
        .catch(e => {
          console.log(e);
          observer.error(e);
        });
    });
  }

  rateMovie(movieId, rating, account): any {
    return new Observable(observer => {
      this.MovieRating.methods.rate(movieId, rating).send({from: account}).then(value => {
        observer.next(value);
        observer.complete();
      }).catch(e => {
        console.log(e);
        observer.error(e);
      });
    });
  }
}
