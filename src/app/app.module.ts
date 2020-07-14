//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './users/user.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//components
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

//providers
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      //redirect default as our home page specified redirect path
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      //wild card path is when there no is no match path mainly for 404 error page
      { path: '**', component: PageNotFoundComponent },
      // lazyload UserModule
      { path: 'users', loadChildren: () => import('./users/user.module').then(mod => mod.UserModule) }

    ]),
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
