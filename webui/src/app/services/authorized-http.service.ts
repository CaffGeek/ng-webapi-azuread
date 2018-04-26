import { Observable } from 'rxjs/Observable'
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';

@Injectable()
export class AuthorizedHttp {

  constructor(private http: Http, private authService: AuthService, private router: Router) {}

  createAuthorizationHeader() : RequestOptions {
    let token = this.authService.getToken();    
    let headers =  new Headers();   
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' +  token); 
    return  new RequestOptions({ headers: headers });   
  }

  get(url) {    
    let options = this.createAuthorizationHeader();   
    return this.intercept(this.http.get(url, options));  
  }

  post(url, data) {
    let options = this.createAuthorizationHeader();      
    return this.intercept(this.http.post(url, data, options));
  }

  postWithNoData(url) {
    let options = this.createAuthorizationHeader();      
    return this.intercept(this.http.post(url, '', options));
  }

  put(url, data) {    
    let options = this.createAuthorizationHeader();    
    return this.intercept(this.http.put(url, data, options));  
  }

  delete(url) {
    let options = this.createAuthorizationHeader();      
    return this.intercept(this.http.delete(url, options));
  } 
  
  intercept(observable: Observable<any>)
  {
      return observable.catch(err => {
          if (err.status === 403) {
             return this.forbidden();
          } 
          else if (err.status === 401){
            return this.refresh();
          }
          else {
              return Observable.throw(err);
          }
      });
  }

  refresh(): Observable<any>{
    location.reload();
    return Observable.empty(); 
  }

  forbidden(): Observable<any>
  {
      this.router.navigate(['/forbidden']);
      return Observable.empty();
  } 

}