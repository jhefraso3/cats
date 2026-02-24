import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alert } from './interfaces/alert.interface';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    standalone: false
})
export class AlertComponent {
  dialogType!: string;
  delete: string = './assets/img/cancel.svg';
  warning: string = '/assets/img/warning-svg.svg';
  success: string = '/assets/img/success.svg';

  constructor(
    public dialogRefAlert: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alert,
  ) {
    if (data.icon == 'alert') {
      this.dialogType = this.delete;
    }

    if (data.icon == 'warning') {
      this.dialogType = this.warning;
    }

    if (data.icon == 'success') {
      this.dialogType = this.success;
    }
  }

  ngOnInit() {}

  accept(confirm: boolean) {
    this.closeAlert(confirm);
  }

  closeAlert(confirm: boolean) {
    this.dialogRefAlert.close(confirm);
  }
}
