import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatGridListModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule
} from '@angular/material';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
  CommonModule,
  MatToolbarModule,
  MatGridListModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  ReactiveFormsModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatChipsModule,
  MatTabsModule,
  MatDatepickerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatMomentDateModule,
  MatDividerModule
  ],
  exports: [
  CommonModule,
   MatToolbarModule,
   MatGridListModule,
   MatButtonModule,
   MatCardModule,
   MatInputModule,
   MatDialogModule,
   MatTableModule,
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule,
   ReactiveFormsModule,
   MatCheckboxModule,
   MatSlideToggleModule,
   MatSelectModule,
   MatChipsModule,
   MatTabsModule,
   MatDatepickerModule,
   MatSidenavModule,
   MatSnackBarModule,
   MatMomentDateModule,
   MatDividerModule
   ],
})
export class CustomMaterialModule {}
