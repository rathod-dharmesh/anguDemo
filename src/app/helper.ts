import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Injectable()
export class Helper {
       constructor(
           private toastyService:ToastyService, 
           private toastyConfig: ToastyConfig,
        private router: Router,
           private slimLoader: SlimLoadingBarService
           ) {
           this.toastyConfig.position = 'top-left';
       }


    isPage(slug:any){
        if(this.router.url == '/404' || this.router.url == '/register')
        {
            return true;
        }
        return slug==this.router.url;
        // console.log(this.router.url);
    }

    loading(status:boolean){
        if(status){
            //this.completeProgress();
            this.startProgress();
        }else{
            this.completeProgress();
        }
    }

       successMessage(data:any, message:any){
        if(data.message != undefined){
            this.addToast(data.message, "Success!", 'success');
        }else{
            this.addToast(message, "Success!", 'success');
        }
       }

       errorMessage(error:any, default_message:any){
           // console.log("errorMessage",error);
        if(error.message == "No JWT present or has expired"){
            this.addToast('You are not login, Please login.', "Oops!", 'error');
            this.router.navigate(['/login']);
            return;
        }
        if(error == "" || error==null){
            this.addToast(default_message, "Oops!", 'error');
            return;
        }
        error = error.json();
        let all_errors:any = {};
        let message:any = "";
        if(error.errors != undefined){
            if(this.isJsObject(error.errors)){
                all_errors = error.errors;
                message = [];
                Object.keys(all_errors).map((key) => {
                    for(let er of all_errors[key]) {
                          message.push(er);
                    }
                });
                message = message.join('<br>');
            }else{
                message =  error.errors
            }
              switch (error.type) {
                case "expired":
                      this.addToast(message, "Oops!", 'error');
                      break;

                default:
                      this.addToast(message, "Oops!", 'error');
                      break;
            }
        }else{
            if(error.error != undefined || error.error !=null)
              this.addToast(error.error, "Oops!", 'error');
            else
              this.addToast(default_message, "Oops!", 'error');
        }

        if(error.code == 404){
            this.router.navigate(['/404']);
        }
    }


       objectToParams(object:any):string{
          return Object.keys(object).map((key) => 
          {
            if(this.isJsObject(object[key])){
              return this.subObjectToParams(encodeURIComponent(key), object[key]) 
            }else{
              if(object[key] != null)
                return `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`;
              else
                return `${encodeURIComponent(key)}=`;
            }
          }
          ).join('&');
    }

    subObjectToParams(key:any,object:any) :string {
        return Object.keys(object).map((childKey) => {
            if(this.isJsObject(object[childKey]))
              return this.subObjectToParams(`${key}[${encodeURIComponent(childKey)}]`, object[childKey]);
            else
              return `${key}[${encodeURIComponent(childKey)}]=${encodeURIComponent(object[childKey])}`;
          }
        ).join('&');
    }

    isJsObject(object:any){
        let type:string = typeof object;
        return (type == 'object' || type == 'Array') && object != null;
    }

    addToast(msg:any, title:any, type:any) {
        var toastOptions:ToastOptions = {
            title: title,
            msg: msg,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap',
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        switch (type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }

    setProgres(status:any) {
        this.slimLoader.progress = status;
    }
    startProgress() {
        this.slimLoader.start();
    }
    completeProgress() {
        this.slimLoader.complete();
    }
    stopProgress() {
        this.slimLoader.stop();
    }
    resetProgress() {
        this.slimLoader.reset();
    }
    incrementProgress() {
        this.slimLoader.progress++;
    }
}
