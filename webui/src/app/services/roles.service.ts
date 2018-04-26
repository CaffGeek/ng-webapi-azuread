import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map'

@Injectable()
export class RolesService {

  private apiEndPoint: string = `${environment.apiEndpoint}`;
  
  constructor(private http: Http) {}

  getRoleMap() : Observable<RoleMap[]> {
    return this.http
        .get(`${this.apiEndPoint}/rolemap`)
        .map(results => results.json());
  }
}

export class RoleMap {
  role: string
  mapped: string
}