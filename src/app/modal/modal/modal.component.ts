import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { MovieContractService } from 'src/app/services/movie-contract.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  movieName: string;
  account: any;
  accounts: any;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private movieContract: MovieContractService,
    private web3Ser: Web3Service,
    private router: Router
  ) { }

  ngOnInit() {
    this.web3Ser.getAccounts().subscribe(response => {
      this.accounts = response;
      this.account = this.accounts[0];
    });
  }

  onConfirm(): void {
    this.movieContract.addMovie(this.movieName, this.account).subscribe(res => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/movie']);
      this.dialogRef.close(true);
    });
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
