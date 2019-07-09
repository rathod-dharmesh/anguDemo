import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageComponent} from '../pages/main-page/main-page.component';
import {DashboardPageComponent} from '../pages/dashboard-page/dashboard-page.component';
import {UsersPageComponent} from '../pages/user-page/user-page.component';
/*import {VendorsPageComponent} from '../pages/vendor-page/vendor-page.component';*/
import {VendorsPageComponent,VendorsDetailComponent} from '../pages/vendor-page/vendor-page.component';
import {ProductsPageComponent} from '../pages/product/product-page.component';
import {PurchasePageComponent} from '../pages/purchasing-page/purchase-page.component';
import {LoginPageComponent} from '../pages/login-page/login-page.component';
import {ResetPageComponent} from '../pages/login-page/reset-page.component';
import {SetPasswordComponent} from '../pages/login-page/setpassword-page.component';
import { AuthGuard } from '../services/auth.guard';

// Routes model for application. Some of the pages are loaded lazily to increase startup time.
const APP_ROUTES: Routes = [
  {
    path: 'main', component: MainPageComponent, children: [
      {path: 'dashboard', component: DashboardPageComponent,canActivate: [AuthGuard]},
      {path: 'user', component: UsersPageComponent,canActivate: [AuthGuard]},
    /*{path: 'vendors', component: VendorsPageComponent,canActivate: [AuthGuard]},
      {path: 'vendor/:id', component: VendorsDetailComponent,canActivate: [AuthGuard]},
      {path: 'products', component: ProductsPageComponent,canActivate: [AuthGuard]},*/
    /*{path: 'purchase', component: PurchasePageComponent,canActivate: [AuthGuard]},*/
      {path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
      {path: '**', redirectTo: 'dashboard', pathMatch: 'prefix'}]
  },
 /* {path: 'reset-password/:email/:token', component: SetPasswordComponent},
  {path: 'reset', component: ResetPageComponent},*/
  {path: 'login', component: LoginPageComponent},
  {path: '', redirectTo: '/login', pathMatch: 'prefix'},
  {path: '**', redirectTo: '/login', pathMatch: 'prefix'}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {preloadingStrategy: PreloadAllModules}),
  ]
})
export class AppRoutesModule {
}
