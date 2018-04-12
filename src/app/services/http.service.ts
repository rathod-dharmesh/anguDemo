import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
declare var $: any;
import { Helper } from '../helper';

@Injectable()
export class HttpService extends Http {
  public pendingRequests:any = 0;
  public showLoading:boolean = false;

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, public helper: Helper) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
      return this.intercept(super.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
      if(options != undefined && (options.search == undefined || options.search == null)){
        let params = this.helper.objectToParams(options);
        if(url.indexOf('?') >= 0){
          url = url+"&"+params;
        }else{
          url = url+"?"+params;
        }
      }
      return this.intercept(super.get(url,options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {   
      return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.intercept(super.delete(url, options));
  }
  
  getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    this.pendingRequests++;
    this.turnOnModal();
    return observable
      .do((res: Response) => {
        this.turnOffModal();
      }, (err: any) => {
        this.turnOffModal();
      })
      .finally(() => {
        this.turnOffModal()
      });
    }
  
  private turnOnModal() {
    if (!this.showLoading) {
        this.showLoading = true;
        //$('body').spin("modal", "#FFFFFF", "rgba(51, 51, 51, 0.1)");
        //console.log("Turned on modal");
        this.helper.loading(true);
    }
    this.showLoading = true;
  }
  
  private turnOffModal() {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      if (this.showLoading) {
        //$('body').spin("modal", "#FFFFFF", "rgba(51, 51, 51, 0.1)");
        this.helper.loading(false);
      }
      this.showLoading = false;
    }
  }

}