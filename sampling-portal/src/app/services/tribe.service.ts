import { Injectable } from '@angular/core';
import { Observable, of, from, EMPTY, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataSource } from "@angular/cdk/collections";
import { TribeMember } from './tribeMember';
import { TribeChannel } from './tribeMember';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TribeService implements DataSource<TribeMember> {

  constructor(private http: HttpService) { 
  
   this.refresh();
     
  }

  //
  // DataSource<TribeMember> interface
  //
  private tribeList: BehaviorSubject<TribeMember[]> = new BehaviorSubject<TribeMember[]>(null);
  
  connect(source): Observable<TribeMember[]> {

        return this.tribeList.asObservable();

  }

  disconnect() {

  }

  // TRIBE operations

  /**
   * refresh the local cache from the server
   */
  private refresh(): void {
    
    this.http.getAuth('tribe')
               .subscribe(
               (tribe: TribeMember[]) => {
                 this.tribeList.next(tribe);
               },
               (error) => {
                   
               }
               );
  }
  
  /**
   * retrieve all tribe members for the users organisation from the local cache
   */
  getAll(): Observable<TribeMember[]> {

    return this.tribeList.asObservable();

  }

  /**
   * retrieve one tribe member based on the id
   */
  getOne(memberId): Observable<TribeMember> {

    const url = 'tribe/' + memberId;
    return this.http.getAuth(url);

  }

  /**
   * update a tribe member.
   */
  update(tribe: TribeMember): Observable<any> {

    const url = 'tribe/' + tribe._id;
    return this.http.putAuth(url, tribe);

  }

  /**
   * mark a tribe member as deleted
   */
  delete(tribe: TribeMember): Observable<boolean> {

        return of(true);

  }

  /**
   * create a new tribe member
   */
  create(tribe: TribeMember): Observable<string> {

    return this.http.postAuth('tribe', tribe)
               .pipe(
                 tap((result) => { this.refresh(); })
               );

  }

  /**
   * get tribe category tag definitions
   */
  getTribeCategoryTagNames(): Observable<any[]> {

    const names = [{ displayName: 'Samples', tagName: 'sample'},
                   { displayName: 'Publication', tagName: 'pubication'}];

    return of(names);

  }

  // TRIBE CHANNEL OPERATIONS

  /**
   * create a new channel for a given tribe member
   */
  public createChannel(tribeId, channel): Observable<TribeChannel> {

    const url = 'tribe/' + tribeId + '/channel';
    if (channel._id !== undefined) {
      delete channel._id;
    }
    return this.http.postAuth(url, channel);

  }

  /**
   * update an existing channel for a given tribe member
   */
  public updateChannel(tribeId, channel): Observable<TribeChannel> {

    const url = 'tribe/' + tribeId + '/channel/' + channel._id;
    return this.http.putAuth( url, channel);

  }

  /**
   * delete an existing channel for a given tribe member
   */
  public deleteChannel(tribeId, channelId): Observable<boolean> {

    const url = 'tribe/' + tribeId + '/channel/' + channelId;
    return this.http.deleteAuth( url );

  }
}
