import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = '9e2640b493df2ff38a160a5abc5ef8ec';
    this.language = 'en-US';
    this.region = 'US';
  }

  getPopular(page: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${this.baseUrl}movie/popular?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`);
  }

  searchMovies(searchStr: string, page: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchStr}&page=${page}&language=${this.language}&region=${this.region}`);
  }
}
