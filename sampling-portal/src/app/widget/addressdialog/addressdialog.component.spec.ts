import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressdialogComponent } from './addressdialog.component';

describe('AddressdialogComponent', () => {
  let component: AddressdialogComponent;
  let fixture: ComponentFixture<AddressdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
