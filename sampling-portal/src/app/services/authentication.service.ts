import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, flatMap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { User } from './user';
import { UserChannel } from './user';

@Injectable()
export class AuthenticationService {

  private loginUrl = 'login';
  private getUserUrl = '';

  public loggedIn = false;

  private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  public postLoginUrl;

  private authUrl = 'auth';

  constructor(private http: HttpService) {}

  /**
   * authenticate the user, returns true if success and sets the user session
   * if logged is followed by a call to get session user
   * TODO - does not populate session user, there is no use case to do so at present
   */
  public login(username: string, password: string): Observable<boolean> {

    const url = this.authUrl + '?username=' + username + '&password=' + password;

    return this.http.getNoAuth(url)
     .pipe(
       flatMap((u: User) => {
         this._user.next(u);
         this.loggedIn = true;
         return of(true);
     })
     );
  }

  /**
   * authenticate a user based on an invitation to a campaign.
   * This is used when the invitation URL is followed by the tribe member to accept/decline an invitation
   */
  public authenticateInvitation(campaignId, campaignMemberId, uuid): Observable<boolean> {

    const url = this.authUrl + '/invitation/' + campaignId + '/' + campaignMemberId + '/' + uuid;

    return this.http.getNoAuth(url)
     .pipe(
       flatMap((u: User) => {
         this._user.next(u);
         this.loggedIn = true;
         return of(true);
     })
     );
  }

  /**
   * return an observable to the session user, is populated after login
   */
  public getSessionUser(): Observable<User> {

    return this._user.asObservable();

  }

  public isLoggedIn(): boolean {

     return this.loggedIn;

  }
}
