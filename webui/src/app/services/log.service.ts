import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthorizedHttp } from './authorized-http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class LogService {

  private apiEndPoint: string = `${environment.apiEndpoint}`;
  
  constructor(private http: AuthorizedHttp) {}

  getLogs() : Observable<any[]> {
    return this.http
        .get(`${this.apiEndPoint}/log`)
        .map(results => results.json())
        .catch(error => Observable.of(<any[]>[]));
  }
}
