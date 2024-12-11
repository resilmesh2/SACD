import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [MatDialogModule, MatSnackBarModule, MatButtonModule, MatMenuModule, MatIconModule, MatDividerModule],
  exports: [MatDialogModule, MatSnackBarModule, MatButtonModule, MatMenuModule, MatIconModule, MatDividerModule],
})
export class NotificationMaterialModule {}
