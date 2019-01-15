import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddressComponent } from './../address/address.component';

@Component({
  selector: 'app-addressdialog',
  templateUrl: './addressdialog.component.html',
  styleUrls: ['./addressdialog.component.css']
})
export class AddressdialogComponent implements OnInit {

  @ViewChild('address')
  address: AddressComponent;
  
  constructor(public dialogRef: MatDialogRef<AddressComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
   }

  ngOnInit() {
  }

}
