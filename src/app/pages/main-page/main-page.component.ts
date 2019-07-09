import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {ResizeService} from '../../resize/resize.service';
import {TranslateService} from '@ngx-translate/core';
import {routerTransition} from '../../utils/page.animation';
import {Router} from '@angular/router';
import { ActivatedRoute, Params, NavigationEnd } from '@angular/router'; 
import {Http, RequestOptions, Headers } from '@angular/http'; 
import {Settings } from '../../settings'; 
import {AuthHttp } from 'angular2-jwt'; 
import {Helper } from '../../helper'; 
import {NgxDatatableModule } from '@swimlane/ngx-datatable'; 
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { User } from '../../services/user.service';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { Auth } from '../../services/auth.service';
/**
 * This page wraps all other pages in application, it contains header, side menu and router outlet for child pages
 */
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [routerTransition],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit {
  // Model for side menu
  menuModel = [
    {
      title: 'Dashboard',
      routerUrl: '/main/dashboard',
      iconClass: 'material-icons',
      iconCode: 'dashboard',
    },
   /* {
      title: 'Purchasing',
      routerUrl: '/main/purchase',
      iconClass: 'material-icons',
      iconCode: 'person',
    },
    {
      title: 'Forecasting',
      routerUrl: '/',
      iconClass: 'material-icons',
      iconCode: 'person',
    },
    {
      title: 'Products',
      routerUrl: '/main/products',
      iconClass: 'material-icons',
      iconCode: 'person',
    },
    {
      title: 'Vendor',
      routerUrl: '/main/vendors',
      iconClass: 'material-icons',
      iconCode: 'person',
    },*/
    
    {
      title: 'User',
      iconClass: 'material-icons',
      iconCode: 'format_color_text',
      children: [
        {
          title: 'User\'s Listing',
          routerUrl: '/main/user'
        }
      ]
    },
    
  ];
  // Side menu options
  isSmallMenuMode = false;
  isMenuCollapsed = false;
  isMenuClosed = this.isSmallWidth();
  isOverlayMenuMode = this.isSmallWidth();
  // Side menu animation value. Is used for delay to render content after side panel changes
  sideNavTransitionDuration = 300;
  // Open/close options window
  isOptionsClosed = true;
  // Box layout option
  isBoxedLayout = false;
  // Fixed header option
  isFixedHeader = true;
  currentUser={};
  constructor(private resizeService: ResizeService, 
    translateService: TranslateService, 
    private router: Router,
    private modalService: NgbModal, 
    private modalRef: NgbModal,
    public helper: Helper,
    public http: Http, 
    public authHttp: AuthHttp,
    public users: User,
    public auth: Auth) {
    this.onResize();
    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translateService.use('en');

    if(this.auth.loggedIn()){
        this.currentUser = this.users.getCurrentUser();
      }
  }

  /**
   * Window resize listener
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeService.resizeInformer$.next();
    if (this.isSmallWidth()) {
      this.isOverlayMenuMode = true;
      this.isMenuClosed = true;
      setTimeout(() => this.resizeService.resizeInformer$.next(), this.sideNavTransitionDuration + 700);
    }
  }

  /**
   * Call resize service after side panel mode changes
   */
  onSideNavModeChange() {
    setTimeout(() => {
      this.resizeService.resizeInformer$.next();
    }, this.sideNavTransitionDuration)
  }

  ngOnInit(): void {
  }

  /**
   * Call resize service after box mode changes
   */
  toggleBoxed() {
    this.isBoxedLayout = !this.isBoxedLayout;
    setTimeout(() => {
      this.resizeService.resizeInformer$.next()
    }, 0);
  }

  toggleCompactMenu() {
    this.isSmallMenuMode = !this.isSmallMenuMode;
    setTimeout(() => {
      this.resizeService.resizeInformer$.next()
    }, this.sideNavTransitionDuration);
  }

  /**
   * Call resize service after side panel mode changes
   */
  toggleOverlayMode() {
    this.isOverlayMenuMode = !this.isOverlayMenuMode;
    setTimeout(() => {
      this.resizeService.resizeInformer$.next()
    }, this.sideNavTransitionDuration);
  }

  /**
   * Changes header mode
   */
  toggleFixedHeader() {
    this.isFixedHeader = !this.isFixedHeader;
  }

  /**
   * Return url as state, that will trigger animation when url changes
   * @param outlet
   * @returns {string}
   */
  getState(outlet) {
    return this.router.url;
  }


  logOut(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private isSmallWidth() {
    return window.innerWidth < 700;
  }
}
