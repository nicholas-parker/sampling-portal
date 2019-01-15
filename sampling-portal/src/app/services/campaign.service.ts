import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Campaign } from './campaign';
import { ActionResponse } from './actionresponse';
import { DataSource } from '@angular/cdk/table';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { flatMap, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CampaignService implements DataSource<Campaign> {

  private campaignList: BehaviorSubject<Campaign[]> = new BehaviorSubject<Campaign[]>(new Array<Campaign>());
  public length;

  constructor(private httpService: HttpService) {

    this.refresh();

  }

  //
  // datasource
  //

  public connect(object): Observable<Campaign[]> {

    return this.campaignList.asObservable();

  }

  public disconnect(): void {

  }

  //
  // data accessors
  //

  public getCampaignList(): Observable<Campaign[]> {

    return this.campaignList.asObservable();

  }

  public get(campaignId): Observable<Campaign> {

        const url = 'campaign/' + campaignId;
        return this.httpService.getAuth(url);

  }

  /**
   * save an existing campaign
   */
  public save(campaign: Campaign): Observable<Campaign> {

        const url = 'campaign/' + campaign._id;
        return this.httpService.putAuth(url, campaign)
                   .pipe(
                   tap((result: Campaign)=> {
                     const list: Array<Campaign> = this.campaignList.value;
                     const idx = list.findIndex( c => c._id === campaign._id);
                     list[idx] = campaign;
                     this.campaignList.next(list);
                   }),
                   );


  }

  public create(campaign: Campaign): Observable<Campaign> {

        campaign.closeDate = new Date();
        campaign.openDate = new Date();
        campaign.tribe = new Array();
        campaign.tags = new Array();

        const url = 'campaign';
        return this.httpService.postAuth(url, campaign)
          .pipe(
          flatMap((newCampaign: Campaign) => {
            const c: Campaign[] = this.campaignList.value;
            c.push(newCampaign);
            this.campaignList.next(c);
            return of(newCampaign);
          }),
          catchError((err: any) => {
              console.log(err);
              return of(new Campaign());
            }
          )
        );
    }


  public archive(id): Observable<Campaign> {

         return of (new Campaign());

  }

  //
  // engagement invitaions
  //

  /**
   * get a campaign for a given campaign id, tribe member and engagement
   */
  public getCampaingForTribeInvitation(campaignId, tribeMemberId, uuid): Observable<Campaign> {

    const url = 'campaign/' + campaignId + '/' + tribeMemberId + '/' + uuid;
    return this.httpService.get(url);

  }

  /**
   * set the campaign tribe members invitation to yes
   */
  public setInvitationYes(campaignId, campaignTribeMemberId, uuid): Observable<ActionResponse> {

    const url = 'campaign/' + campaignId + '/' + campaignTribeMemberId + '/' + uuid;
    const result = { status : 'consent_approved' };

    const response = new ActionResponse();
    response.actionName = 'set_invitation_yes';
    response.issueId = campaignTribeMemberId;
    return this.httpService.postAuth(url, result)
               .pipe(
                 flatMap((d: any) => {
                  response.result = response.ACTION_OK;
                  return of(response);
               }),
                 catchError((e: any) => {
                   response.result = response.ACTION_FAIL;
                   response.errorMessage = e;
                   response.userInformation = 'There was a technical error so we cant process your response';
                   return of(response);
                 })
               );
  }

  /**
   * set the campaign tribe members invitation to no
   */
  public setInvitationNo(campaignId, campaignTribeMemberId, uuid): Observable<ActionResponse> {

    const url = 'campaign/' + campaignId + '/' + campaignTribeMemberId + '/' + uuid;
    const result = { status : 'consent_declined' };

    const response = new ActionResponse();
    response.actionName = 'set_invitation_no';
    response.issueId = campaignTribeMemberId;
    return this.httpService.postAuth(url, result)
               .pipe(
                 catchError((e: any) => {
                   response.result = response.ACTION_FAIL;
                   response.errorMessage = e;
                   response.userInformation = 'There was a technical error so we cant process your response';
                   return of(response);
                 })
               );
  }

  /**
   * private function to refresh the local campaign list cache for the tribe member
   */
  private refresh() {

//    const url = 'campaign';
//    this.httpService.getAuth(url)
//     .subscribe(
//       (camp: [Campaign]) => {
//         this.length = camp.length;
//         this.campaignList.next(camp);
//       },
//       err => { console.log(err); }
//     );

  }
}
