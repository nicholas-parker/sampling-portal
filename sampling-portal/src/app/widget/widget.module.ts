import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from './../material/material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MenubarComponent } from './menubar/menubar.component';
import { AddressComponent } from './address/address.component';
import { AddressdialogComponent } from './addressdialog/addressdialog.component';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    CustomMaterialModule,
    RouterModule
  ],
  declarations: [
    MenubarComponent,
    AddressComponent,
    AddressdialogComponent,
  ],
  exports: [
    MenubarComponent,
    AddressComponent,
    AddressdialogComponent
  ],
  entryComponents: [
    AddressdialogComponent
  ]
})
export class WidgetModule { }
