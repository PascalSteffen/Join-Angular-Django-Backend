import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class UtilityServiceService {

  constructor(public _snackBar: MatSnackBar) { }


  /**
  * alert for user-actions
  * @param message
  */
  alert(message: string, time: number) {
    this._snackBar.open(message, '', {
      duration: time
    });
  }
}
