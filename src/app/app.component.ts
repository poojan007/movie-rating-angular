import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ModalComponent } from './modal/modal/modal.component';
import { MovieService } from './services/movie.service';
import { Web3Service } from './services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movie-rating-angular';

  constructor(
    public dialog: MatDialog,
    private web3Ser: Web3Service
  ) { }

  ngOnInit(): void {

  }

  addMovie() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
