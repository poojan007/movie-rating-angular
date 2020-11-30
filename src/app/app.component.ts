import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ModalComponent } from './modal/modal/modal.component';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movie-rating-angular';

  constructor(
    public dialog: MatDialog
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
