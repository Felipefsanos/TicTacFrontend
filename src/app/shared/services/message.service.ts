import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackbar: MatSnackBar) { }

  public success(message: string, action?: string): void {
    this.snackbar.open(message, action ? action : 'OK',
      {
        panelClass: 'success-snackbar',
      });
  }

  public info(message: string, action?: string): void {
    this.snackbar.open(message, action ? action : 'OK',
      {
        panelClass: 'info-snackbar',
      });
  }

  public warn(message: string, action?: string): void {
    this.snackbar.open(message, action ? action : 'OK',
      {
        panelClass: 'warn-snackbar',
      });
  }
}
