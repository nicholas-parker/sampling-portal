import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { User } from './user';
import { UserChannel } from './user';

/**
* wrapper for angular http which adds the authorisation header
*/

@Injectable()
export class HttpService {

  private _bearer;

  /**
   * local
   */
  // private port = 3000;
  // private URL = 'http://localhost';

  /**
   * GCloud
   */
  private port = 80;
  private URL = 'http://nvp-1-214110.appspot.com';

  constructor(private http: HttpClient) {}

  public getNoAuth(url: string): Observable<any> {

    return this.http.get(this.path(url), {responseType: 'text'})
      .pipe(
       tap((bearer) => {
        this._bearer = 'bearer ' + bearer;
        })
      );

  }

  public getUser() {

    const headers = new HttpHeaders()
            .set('authorization', this._bearer);

    // TODO - create service to get user details
    // const url;
    // return this.http.get( this.path(url), {params});

    const sessionUser: User = new User();
    sessionUser.username = 'Nick Parker';
    sessionUser.roles = ['admin'];
    sessionUser.channel = new Array<UserChannel>();
    sessionUser.channel.push({ channelCode : 'email', recipient : 'nick@noodle.com'});
    sessionUser.channel.push({ channelCode : 'twitter', recipient : '@Nick_Noodle'});

    return of(sessionUser);

  }

  public get(url: string): Observable<any> {

    return this.http.get( this.path(url) );

  }

  public getAuth(url: string): Observable<any> {

    const headers = new HttpHeaders()
            .set('authorization', this._bearer);

    return this.http.get( this.path(url), {headers});

  }

  public putAuth(url: string, body: any): Observable<any> {

    const headers = new HttpHeaders()
            .set('authorization', this._bearer);

    return this.http.put( this.path(url), body, {headers});

  }

  public postAuth(url: string, body: any): Observable<any> {

    const headers = new HttpHeaders()
            .set('authorization', this._bearer);

    return this.http.post( this.path(url), body, {headers});

  }

  public deleteAuth(url: string): Observable<any> {

     const headers = new HttpHeaders()
            .set('authorization', this._bearer);

     return this.http.delete( this.path(url), {headers});

  }

  private path(url: string): string {

    return this.URL + ':' + this.port + '/' + url;

  }
}
