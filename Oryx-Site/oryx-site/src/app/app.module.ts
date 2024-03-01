import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { ServicePageComponent } from './components/service-page/service-page.component';
import { OryxClientsSliderComponent } from './components/oryx-clients-slider/oryx-clients-slider.component';
import { RequestDemoFooterComponent } from './components/request-demo-footer/request-demo-footer.component';
import { OryxFooterComponent } from './components/oryx-footer/oryx-footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NavBarMobileComponent } from './components/nav-bar-mobile/nav-bar-mobile.component';
import { ContactUsPageComponent } from './components/contact-us-page/contact-us-page.component';
import { ContactFooterComponent } from './components/contact-footer/contact-footer.component';
import { RequestDemoPageComponent } from './components/request-demo-page/request-demo-page.component';
import { OryxServiceComponent } from './components/oryx-service/oryx-service.component';
import { EmailPopUpComponent } from './components/email-pop-up/email-pop-up.component';
import { MicrosoftBusinessPlansComponent } from './components/microsoft-business-plans/microsoft-business-plans.component';
import { OfferedServicesComponent } from './components/offered-services/offered-services.component';
import { OryxPartnersComponent } from './components/oryx-partners/oryx-partners.component';
import { OryxValuesComponent } from './components/oryx-values/oryx-values.component';

import { LoadingService } from './services/loading.service';
import {
  SafePipe,
  YoutubePopUpComponent,
} from './components/youtube-pop-up/youtube-pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { MarkdownModule } from 'ngx-markdown';
import { BlogComponent } from './components/blog/blog.component';
import { BlogsListComponent } from './components/blogs-list/blogs-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ServicePageComponent,
    OryxClientsSliderComponent,
    RequestDemoFooterComponent,
    OryxFooterComponent,
    HomePageComponent,
    AboutPageComponent,
    NavBarComponent,
    LoadingSpinnerComponent,
    NavBarMobileComponent,
    ContactUsPageComponent,
    ContactFooterComponent,
    RequestDemoPageComponent,
    OryxServiceComponent,
    EmailPopUpComponent,
    MicrosoftBusinessPlansComponent,
    OfferedServicesComponent,
    OryxPartnersComponent,
    OryxValuesComponent,
    YoutubePopUpComponent,
    SafePipe,
    BlogPageComponent,
    BlogListComponent,
    BlogComponent,
    BlogsListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MarkdownModule.forRoot(),
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
