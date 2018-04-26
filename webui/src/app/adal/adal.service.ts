import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { AdalUser } from './adal-user.model';
import * as adalLib from 'adal-angular';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/bindCallback';
//import { adal } from './adal-angular.d';
import User = adal.User;

/**
 * 
 * 
 * @export
 * @class AdalService
 */
@Injectable()
export class AdalService {

  /**
   * 
   * 
   * @private
   * @type {adal.AuthenticationContext}
   * @memberOf AdalService
   */
  private adalContext: adal.AuthenticationContext;

  /**
   * 
   * 
   * @private
   * @type {AdalUser}
   * @memberOf AdalService
   */
  private AdalUser: AdalUser = {
    authenticated: false,
    username: '',
    error: '',
    token: '',
    profile: {}
  };

  /**
   * Creates an instance of AdalService.
   * 
   * @memberOf AdalService
   */
  constructor() { }

  /**
   * 
   * 
   * @param {adal.Config} configOptions 
   * 
   * @memberOf AdalService
   */
  public init(configOptions: adal.Config) {
    if (!configOptions) {
      throw new Error('You must set config, when calling init.');
    }

    // redirect and logout_redirect are set to current location by default
    let existingHash = window.location.hash;

    let pathDefault = window.location.href;
    if (existingHash) {
      pathDefault = pathDefault.replace(existingHash, '');
    }

    configOptions.redirectUri = configOptions.redirectUri || pathDefault;
    configOptions.postLogoutRedirectUri = configOptions.postLogoutRedirectUri || pathDefault;

    // create instance with given config
    this.adalContext = adalLib.inject(configOptions);

    window.AuthenticationContext = this.adalContext.constructor;

    // loginresource is used to set authenticated status
    this.updateDataFromCache(this.adalContext.config.loginResource);
  }

  /**
   * 
   * 
   * @readonly
   * @type {adal.Config}
   * @memberOf AdalService
   */
  public get config(): adal.Config {
    return this.adalContext.config;
  }

  /**
   * 
   * 
   * @readonly
   * @type {AdalUser}
   * @memberOf AdalService
   */
  public get userInfo(): AdalUser {
    return this.AdalUser;
  }

  /**
   * 
   * 
   * 
   * @memberOf AdalService
   */
  public login(): void {
    this.adalContext.login();
  }

  /**
   * 
   * 
   * @returns {boolean} 
   * 
   * @memberOf AdalService
   */
  public loginInProgress(): boolean {
    return this.adalContext.loginInProgress();
  }

  /**
   * 
   * 
   * 
   * @memberOf AdalService
   */
  public logOut(): void {
    this.adalContext.logOut();
  }

  /**
   * 
   * 
   * 
   * @memberOf AdalService
   */
  public handleWindowCallback(): void {
    let hash = window.location.hash;

    // var redirectTo = this.adalContext._getItem(this.adalContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
    // if (redirectTo) {
    //   window.location.href = redirectTo;
    // }

    if (this.adalContext.isCallback(hash)) {
      let requestInfo = this.adalContext.getRequestInfo(hash);
      this.adalContext.saveTokenFromHash(requestInfo);
      if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.LOGIN) {
        this.updateDataFromCache(this.adalContext.config.loginResource);

      } else if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.RENEW_TOKEN) {
        this.adalContext.callback = window.parent.callBackMappedToRenewStates[requestInfo.stateResponse];
      }

      if (requestInfo.stateMatch) {
        if (typeof this.adalContext.callback === 'function') {
          if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.RENEW_TOKEN) {
            // Idtoken or Accestoken can be renewed
            if (requestInfo.parameters['access_token']) {
              this.adalContext.callback(this.adalContext._getItem(this.adalContext.CONSTANTS.STORAGE.ERROR_DESCRIPTION)
                , requestInfo.parameters['access_token']);
            }
            else if (requestInfo.parameters['error']) {
              this.adalContext.callback(this.adalContext._getItem(this.adalContext.CONSTANTS.STORAGE.ERROR_DESCRIPTION), null);
              this.adalContext._renewFailed = true;
            }
          }
        }
      }
    }
  }

  /**
   * 
   * 
   * @param {string} resource 
   * @returns {string} 
   * 
   * @memberOf AdalService
   */
  public getCachedToken(resource: string): string {
    return this.adalContext.getCachedToken(resource);
  }

  /**
   * 
   * 
   * @param {string} resource 
   * @returns 
   * 
   * @memberOf AdalService
   */
  public acquireToken(resource: string) {
    let _this = this;   // save outer this for inner function

    let errorMessage: string;
    return Observable.bindCallback(acquireTokenInternal, function (token: string) {
      if (!token && errorMessage) {
        throw (errorMessage);
      }
      return token;
    })();

    function acquireTokenInternal(cb: any) {
      let s: string = null;

      _this.adalContext.acquireToken(resource, (error: string, tokenOut: string) => {
        if (error) {
          _this.adalContext.error('Error when acquiring token for resource: ' + resource, error);
          errorMessage = error;
          cb(<string>null);
        } else {
          cb(tokenOut);
          s = tokenOut;
        }
      });
      return s;
    }
  }

  /**
   * 
   * 
   * @returns {Observable<adal.User>} 
   * 
   * @memberOf AdalService
   */
   public getUser(): Observable<any> {
    return Observable.bindCallback((cb: (u: adal.User) => User) => {
      this.adalContext.getUser(
        function (error: string, user: adal.User) {
          if (error) {
            this.adalContext.error('Error when getting user', error);
            cb(null);
          } else {
            cb(user);
          }
        }
      );
    })();
  } 

  /**
   * 
   * 
   * 
   * @memberOf AdalService
   */
  public clearCache(): void {
    this.adalContext.clearCache();
  }

  /**
   * 
   * 
   * @param {string} resource 
   * 
   * @memberOf AdalService
   */
  public clearCacheForResource(resource: string): void {
    this.adalContext.clearCacheForResource(resource);
  }

  /**
   * 
   * 
   * @param {string} message 
   * 
   * @memberOf AdalService
   */
  public info(message: string): void {
    this.adalContext.info(message);
  }

  /**
   * 
   * 
   * @param {string} message 
   * 
   * @memberOf AdalService
   */
  public verbose(message: string): void {
    this.adalContext.verbose(message);
  }

  /**
   * 
   * 
   * @param {string} url 
   * @returns {string} 
   * 
   * @memberOf AdalService
   */
  public GetResourceForEndpoint(url: string): string {
    return this.adalContext.getResourceForEndpoint(url);
  }

  /**
   * 
   * 
   * 
   * @memberOf AdalService
   */
  public refreshDataFromCache() {
    this.updateDataFromCache(this.adalContext.config.loginResource);
  }

  /**
   * 
   * 
   * @private
   * @param {string} resource 
   * 
   * @memberOf AdalService
   */
  private updateDataFromCache(resource: string): void {
    let token = this.adalContext.getCachedToken(resource);
    this.AdalUser.authenticated = token !== null && token.length > 0;
    let user = this.adalContext.getCachedUser() || { userName: '', profile: undefined };
    if (user) {
      this.AdalUser.username = user.userName;
      this.AdalUser.profile = user.profile;
      this.AdalUser.token = token;
      this.AdalUser.error = this.adalContext.getLoginError();
    } else {
      this.AdalUser.username = '';
      this.AdalUser.profile = {};
      this.AdalUser.token = '';
      this.AdalUser.error = '';
    }
  };
}