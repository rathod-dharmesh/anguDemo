import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers, URLSearchParams } from '@angular/http';
declare var $: any;
import { Helper } from '../helper';

import { AuthHttp, AuthConfig, tokenNotExpired } from 'angular2-jwt';
import { Auth } from './auth.service';

import { Settings } from '../settings';
import { Router } from '@angular/router';


@Injectable()
export class AuthHttpService extends AuthHttp {
  public pendingRequests:any = 0;
  public showLoading:boolean = false;
  public _http:any = {};
  public _helper:any = {};

  constructor(config: AuthConfig, http: Http, options: RequestOptions, helper: Helper) {
    super(config, http, options);
    this._http = http;
    this._helper = helper;
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
      return super.request(url, options);
  }



  get(url: string, options?:RequestOptionsArgs): Observable<Response> {
      if(options != undefined && (options.search == undefined || options.search == null)){
        let params = this._helper.objectToParams(options);
        if(url.indexOf('?') >= 0){
          url = url+"&"+params;
        }else{
          url = url+"?"+params;
        }
      }
      if(tokenNotExpired()){
        return super.get(url,options);
      }else{
        return this._http.get(Settings.apiUrl('api/token'),options);
      }
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {   
    
    if(tokenNotExpired()){
      return super.post(url, body, options);
    }else{
      return this._http.get(Settings.apiUrl('api/token'),options);
    }
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {

    if(tokenNotExpired()){
      return super.put(url, body, options);
    }else{
      return this._http.get(Settings.apiUrl('api/token'),options);
    }
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
      
    if(tokenNotExpired()){
      return super.delete(url, options);
    }else{
      return this._http.get(Settings.apiUrl('api/token'),options);
    }
  }
  
  getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
    return options;
  }

}