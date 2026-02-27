import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import {
  SnackbarAuxColor,
  SnackbarIcon,
  SnackbarPrimaryColor,
  SnackbarType,
} from '../models/snackbar-type';
import { SnackbarComponent } from '../components/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   *
   * @param message Digitar el mensaje que se desea mostrar
   * @param type Seleccionar alguno de los tipos de snackbar contenidos en el enum SnackbarType
   * @returns Retorna una alerta con el mensaje y el tipo de snackbar seleccionado
   */
  openCustomSnackbar(
    message: string,
    type: SnackbarType,
  ): MatSnackBarRef<SnackbarComponent> | null {
    if (!message) {
      return null;
    }

    const snackbarRef: MatSnackBarRef<SnackbarComponent> =
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
        verticalPosition: 'top',
      });

    snackbarRef.afterDismissed().subscribe();

    snackbarRef.onAction().subscribe();

    snackbarRef.instance.message = message;

    snackbarRef.instance.icon = SnackbarIcon[type];
    snackbarRef.instance.color = SnackbarPrimaryColor[type];
    snackbarRef.instance.colorAux = SnackbarAuxColor[type];

    snackbarRef.instance.snackbarRef = snackbarRef;

    return snackbarRef;
  }
}
