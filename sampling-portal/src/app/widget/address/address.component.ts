import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { flatMap, debounceTime, filter, catchError } from 'rxjs/operators';
import { Observable, of, EMPTY } from 'rxjs';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addressForm: FormGroup;

  @Input()
  data: any;

  @Output() 
  update: Subject<any> = new Subject<any>();

  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) { 

    /**
     * form
     */
    this.addressForm = this.formBuilder.group({

      // non visible
      _id: [''],

      // visible
      recipient: ['', [Validators.required, Validators.minLength(2)]],
      address1: ['', [Validators.required, Validators.minLength(2)]],
      address2: [''],
      address3: [''],
      address4: [''],
      address5: [''],
      postCode: ['', [Validators.required, Validators.minLength(6)]],
      deliveryNotes: ['']
    });

  }

  ngOnInit() {
  
    /**
     * get data and populate form
     */
 
    this.addressForm.valueChanges
                    .pipe(
                       debounceTime(1200),
                       filter( (d: any) => { return d !== null} ))
                       .subscribe((formData: any) => {
                         this.update.next({...this.data, ...formData});
                       });
  }

  patchValue(d: any) {

    this.data = d;
    this.addressForm.get('_id').patchValue(this.data._id, {emitEvent: false});
    this.addressForm.get('recipient').patchValue(this.data.recipient, {emitEvent: false});
    this.addressForm.get('address1').patchValue(this.data.address1, {emitEvent: false});
    this.addressForm.get('address2').patchValue(this.data.address2, {emitEvent: false});
    this.addressForm.get('address3').patchValue(this.data.address3, {emitEvent: false});
    this.addressForm.get('address4').patchValue(this.data.address4, {emitEvent: false});
    this.addressForm.get('address5').patchValue(this.data.address5, {emitEvent: false});
    this.addressForm.get('postCode').patchValue(this.data.postCode, {emitEvent: false});
    this.addressForm.get('deliveryNotes').patchValue(this.data.deliveryNotes, {emitEvent: false});

  }
}
