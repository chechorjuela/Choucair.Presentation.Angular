import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {
  }

  showSuccess(message: string): void {
    this.showSnackbar(message, 'success-snackbar');
  }

  showError(message: string): void {
    this.showSnackbar(message, 'error-snackbar');
  }

  showInfo(message: string): void {
    this.showSnackbar(message, 'info-snackbar');
  }

  showWarning(message: string): void {
    this.showSnackbar(message, 'warning-snackbar');
  }

  private showSnackbar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {duration: 3000, panelClass: [panelClass]});
  }
}
