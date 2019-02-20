import { Component, OnInit, ViewChild } from '@angular/core';
import { flatMap, debounceTime, catchError } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { AuthenticationService } from './../services/authentication.service';
import { CampaignService } from './../services/campaign.service';
import { Campaign } from './../services/campaign';
import { TribeService } from './../services/tribe.service';
import { TribeChannel } from './../services/tribeMember';
import { ActionResponse } from './../services/actionresponse';
import { AddressComponent } from './../widget/address/address.component';
import { AddressdialogComponent } from  './../widget/addressdialog/addressdialog.component';

@Component({
  selector: 'app-engage',
  templateUrl: './engage.component.html',
  styleUrls: ['./engage.component.css']
})
export class EngageComponent implements OnInit {

  public campaign: Campaign;
  public channel: TribeChannel;
  public tribeId;
  public uuid;
  public validInvitation;

  public firstName;
  public title;
  public description;
  public haveDetails = false;
  public preYes = false;
  public preNo = false;
  public isNo = false;
  public isYes = false;

  /**
   * reactive css
   */
  public classContent: string;
  
  private _addressForm;
  @ViewChild(AddressComponent) set address(addressComponent: any) {
    if (addressComponent === undefined) { return; }
    this._addressForm = addressComponent;
    if (this.channel) {
      addressComponent.addressForm.patchValue(this.channel);
    }

    addressComponent.update.pipe(
      flatMap((formData: TribeChannel) => {
        if (formData._id === 0) {
          return this.tribeService.createChannel(this.tribeId, formData);
        } else {
          return this.tribeService.updateChannel(this.tribeId, formData);
        }
      }),
      catchError( err => {
        console.log(err);
        return EMPTY;
      })
    ).subscribe(
      d => {
        if(this.channel._id === 0) {
          this.channel._id = d._id;
          this.snackBar.open('Created new delivery details', null, {duration: 2000});
        } else {
          this.snackBar.open('Updated delivery details', null, {duration: 2000});
        }
        this.channel = d;
      },
      err => {
        this.snackBar.open('Error updating delivery details', null, {duration: 2000});
      }
    );
  }

  constructor(private campaignService: CampaignService,
              private tribeService: TribeService,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {

    /**
     * get data
     */
    let data: any[];
    this.activatedRoute.queryParams.pipe(
        flatMap(params => {
          const q = params['q'];
          data = q.split(',');
          this.uuid = data[2];

          // preselected yes/no - optional
          if (data.length > 3) {
            if (data[3] === 'y') {
              this.preYes = true;
            }
            if (data[3] === 'n') {
              this.preNo = true;
            }
          }
          if (!this.authenticationService.loggedIn) {
            return this.authenticationService.authenticateInvitation(data[0], data[1], data[2]);
          } else {
            return of(true);
          }
        }),
        flatMap((loginStatus: boolean) => {
          this.validInvitation = loginStatus;
          if (!loginStatus) {
            return EMPTY;
          } else {
            return of(true);
          }
        }),
        flatMap((b: boolean) => {
          if (this.preYes === true) {
            return this.campaignService.setInvitationYes(data[0], data[1], data[2]);
          }
          if (this.preNo === true) {
            return this.campaignService.setInvitationNo(data[0], data[1], data[2]);
          }
          return of(new ActionResponse());
        }),
        flatMap((next: ActionResponse) => {
           return this.campaignService.getCampaingForTribeInvitation(data[0], data[1], data[2]);
        }),
        catchError( err => {
          console.log(err);
          return EMPTY;
        })
      ).subscribe((campaign: Campaign) => {

        this.campaign = campaign;
        this.tribeId = this.campaign.tribe[0].member._id;
        this.firstName = this.campaign.tribe[0].member.name.split(' ')[0];
        this.description = this.campaign.promotionDescription;
        this.title = this.campaign.promotionTitle;

        /**
         * populate form with TribeChannel for post
         */
        let post = null;
        if (this.campaign.tribe[0].member.channel !== undefined && this.campaign.tribe[0].member.channel.length > 0) {
          post = this.campaign.tribe[0].member.channel.find((channel: TribeChannel) => {
            return channel.channelType === 'post';
          });
        }

        if (post) {
            this.channel = post;
            this.haveDetails = true;
         } else {
            this.channel = new TribeChannel();
            this.channel._id = 0;
            this.channel.channelType = 'post';
            this.channel.communicate = false;
            this.channel.deliver = true;
            this.channel.valid = true;
         }

         if (this._addressForm) {
           this._addressForm.patchValue(this.channel);
         }
    });

  }

  public ngOnInit() { }

  /**
   * open the address dialogue
   */
  public showAddress(): void {

    // const dialogRef = this.dialog.open(AddressdialogComponent, {width: '40%', height: '600', data: { data: this.channel}});
  }

  /**
   *  no pre-decision, agrees on this component 
   */
  public accept(): void {
    this.preYes = true;
  }

  /**
   * campaign tribe member wants to receive the sample
   */
  public yes(): void {

    this.campaignService.setInvitationYes(this.campaign._id, this.campaign.tribe[0]._id, this.uuid)
        .subscribe((response: ActionResponse) => {
          if (response.result === response.ACTION_OK) {
            this.isYes = true;
            this.snackBar.open('Your response has been recorded', null, {duration: 2000});
          } else {
            this.snackBar.open('There was a technical error and we cant record you response at the moment, please try againg in a few minutes', null, {duration: 2000});
          }
        },
        e => {
          this.snackBar.open('Unexpected error, unable to record your response', null, {duration: 2000});
        });

  }

  /**
   * campaign tribe member does not want to receive the sample
   */
  public no(): void {

    this.campaignService.setInvitationNo(this.campaign._id, this.campaign.tribe[0]._id, this.uuid)
        .subscribe((response: ActionResponse) => {
          if (response.result === response.ACTION_OK) {
            this.isNo = true;
            this.snackBar.open('Your response has been recorded', null, {duration: 2000});
          } else {
            this.snackBar.open('There was a technical error and we cant record you response at the moment, please try againg in a few minutes', null, {duration: 2000});
          }
        },
        e => {
          this.snackBar.open('Unexpected error, unable to record your response', null, {duration: 2000});
        });

  }

  /**
   * change my mind, reset
   */
  public reset() {

    this.isNo = false;
    this.isYes = false;
    this.preNo = false;
    this.preYes = false;

  }
}
