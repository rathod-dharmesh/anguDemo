import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { MultimenuComponent } from './components/multimenu/multimenu.component';
import { AppRoutesModule } from './routes/app-routes.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbButtonsModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResizeService } from './resize/resize.service';
import { EchartComponent } from './components/echart-component/echart.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ComingSoonPageComponent } from './pages/coming-soon-page/coming-soon-page.component';
/*import {ProductsPageComponent} from './pages/products-page/products-page.component';*/
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { AgmCoreModule } from '@agm/core';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Http, RequestOptions, HttpModule, XHRBackend, URLSearchParams } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthGuard } from './services/auth.guard';
import { HttpService } from './services/http.service';
import { AuthHttpService } from './services/auth.http.service';
import { Auth } from './services/auth.service';
import { Helper } from './helper';
import { ToastyModule } from 'ng2-toasty';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { VendorsPageComponent, VendorsDetailComponent } from './pages/vendor-page/vendor-page.component';
import { PurchasePageComponent } from './pages/purchasing-page/purchase-page.component';
import { UsersPageComponent } from './pages/user-page/user-page.component';
import { ProductsPageComponent } from './pages/product/product-page.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChipsModule, ConfirmDialogModule, InputMaskModule, CalendarModule, TooltipModule, OverlayPanelModule, FileUploadModule, DropdownModule, MultiSelectModule,AutoCompleteModule } from 'primeng/primeng';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ResetPageComponent} from './pages/login-page/reset-page.component';
import {SetPasswordComponent} from './pages/login-page/setpassword-page.component';

import { NgUploaderModule } from 'ngx-uploader';
import { User } from './services/user.service';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// AoT requires an exported function for factories for translate module
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function authHttpServiceFactory(http: Http, auth: Auth, options: RequestOptions, helper: Helper) {

  if (options.search == undefined || options.search == null) {
    let params: URLSearchParams = new URLSearchParams();
    options.search = params;
  }
  options.search.set('token', auth.getToken());

  return new AuthHttpService(new AuthConfig({}), http, options, helper);
}

export function HttpServiceFactory(backend: XHRBackend, options: RequestOptions, helper: Helper) {
  return new HttpService(backend, options, helper);
}

@NgModule({
  declarations: [
    AppComponent,
    MultimenuComponent,
    DashboardPageComponent,
    EchartComponent,
    MainPageComponent,
    ComingSoonPageComponent,
    ProductDetailsPageComponent,
    ContactPageComponent,
    VendorsPageComponent,
    UsersPageComponent,
    VendorsDetailComponent,
    ProductsPageComponent,
    PurchasePageComponent,
    LoginPageComponent,
    ResetPageComponent,
    SetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    RouterModule,
    AppRoutesModule,
    NgbModule.forRoot(),
    ToastyModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    NgbButtonsModule,
    NgxGalleryModule,
    TextMaskModule,
    HttpModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    InputMaskModule,
    CalendarModule,
    TooltipModule,
    OverlayPanelModule,
    FileUploadModule,
    DropdownModule,
    MultiSelectModule,
    NgUploaderModule,
    ChipsModule,
    AutoCompleteModule,
  
    // Insert your google maps api key, if you do not need google map in your project, you can remove this import
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_KEY_HERE'
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    ResizeService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    Helper,
    Auth,
    Helper,
    Auth,
    User,
    CookieService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, Auth, RequestOptions, Helper]
    }, {
      provide: Http,
      useFactory: HttpServiceFactory,
      deps: [XHRBackend, RequestOptions, Helper]
    },
    AuthGuard
    ,],
  bootstrap: [AppComponent]
})
export class AppModule {
}
