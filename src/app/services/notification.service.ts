import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public openSuccessSnackBar(message: string) {
    this.snackBar.open(message, '', {
        duration: 5000,
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
    });
  }

  public openInfoSnackBar(message: string) {
    this.snackBar.open(message, '', {
        duration: 5000,
        verticalPosition: 'bottom',
        panelClass: ['info-snackbar']
    });
  }

  public openWarningSnackBar(message: string) {
    this.snackBar.open(message, '', {
        duration: 5000,
        verticalPosition: 'bottom',
        panelClass: ['warning-snackbar']
    });
  }

  public openErrorSnackBar(message: string) {
    this.snackBar.open(message, '', {
        duration: 5000,
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
    });
  }
}
