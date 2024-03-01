import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Daniel's imports
import { MarkdownModule } from 'ngx-markdown';

// Phillip's imports
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';
// import { MatTimepickerModule } from '@angular/material/timepicker';

import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

// components
import { CertificationsAccomplishmentsComponent } from './components/certifications-accomplishments/certifications-accomplishments.component';
import { FooterComponent } from './components/footer/footer.component';
import { GGNetworkComponent } from './components/ggnetwork/ggnetwork.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NavBarDesktopComponent } from './components/nav-bar-desktop/nav-bar-desktop.component';
import { NavBarMobileComponent } from './components/nav-bar-mobile/nav-bar-mobile.component';
import { RecentClientsComponent } from './components/recent-clients/recent-clients.component';
import { QuoteBannerComponent } from './components/quote-banner/quote-banner.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { OrganizationLocationComponent } from './components/organization-location/organization-location.component';

//sections
import { BlogArticleComponent } from './sections/blog-article/blog-article.component';
import { BlogCommentsComponent } from './sections/blog-comments/blog-comments.component';
import { BooksComponent } from './sections/books/books.component';
import { ClientReviewsComponent } from './sections/client-reviews/client-reviews.component';
import { ContactBannerComponent } from './sections/contact-banner/contact-banner.component';
import { ContactInfoComponent } from './sections/contact-info/contact-info.component';
import { DDCTabsComponent } from './sections/ddc-tabs/ddc-tabs.component';
import { DDCLLCTabsComponent } from './sections/ddcllc-tabs/ddcllc-tabs.component';
import { ExpressionsTabsComponent } from './sections/expressions-tabs/expressions-tabs.component';
import { FeaturedBookComponent } from './sections/featured-book/featured-book.component';
import { HeroBannerComponent } from './sections/hero-banner/hero-banner.component';
import { LatestBlogsComponent } from './sections/latest-blogs/latest-blogs.component';
import { MediaBannerComponent } from './sections/media-banner/media-banner.component';
import { OfficialPicturesComponent } from './sections/official-pictures/official-pictures.component';
import { PopularSayingsComponent } from './sections/popular-sayings/popular-sayings.component';
import { PriceCardsComponent } from './sections/price-cards/price-cards.component';
import { RecentMediaComponent } from './sections/recent-media/recent-media.component';
import { PodcastSectionComponent } from './sections/podcast-section/podcast-section.component';
import { SafePipe, YouTubeSectionComponent } from './sections/you-tube-section/you-tube-section.component';

// forms
import { ContactFormComponent } from './forms/contact-form/contact-form.component';
import { CoachingFormComponent } from './forms/coaching-form/coaching-form.component';
import { DdcllcSpeakingFormComponent } from './forms/ddcllc-speaking-form/ddcllc-speaking-form.component';
import { DdcllcTrainingFormComponent } from './forms/ddcllc-training-form/ddcllc-training-form.component';

// pages
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { DDCPageComponent } from './pages/ddc-page/ddc-page.component';
import { DDCLLCPageComponent } from './pages/ddcllc-page/ddcllc-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MediaPageComponent } from './pages/media-page/media-page.component';

// services
import { LoadingService } from './services/loading.service';






@NgModule({
  declarations: [
    AppComponent,

    // components
    CertificationsAccomplishmentsComponent,
    FooterComponent,
    GGNetworkComponent,
    LoadingSpinnerComponent,
    NavBarDesktopComponent,
    NavBarMobileComponent,
    RecentClientsComponent,
    QuoteBannerComponent,
    SocialMediaComponent,
    OrganizationLocationComponent,
    TimePickerComponent,

    // sections
    BlogArticleComponent,
    BlogCommentsComponent,
    BooksComponent,
    ClientReviewsComponent,
    ContactBannerComponent,
    ContactInfoComponent,
    DDCTabsComponent,
    DDCLLCTabsComponent,
    ExpressionsTabsComponent,
    FeaturedBookComponent,
    HeroBannerComponent,
    LatestBlogsComponent,
    MediaBannerComponent,
    OfficialPicturesComponent,
    PopularSayingsComponent,
    PriceCardsComponent,
    RecentMediaComponent,
    PodcastSectionComponent,
    YouTubeSectionComponent,
    
    // forms
    ContactFormComponent,
    CoachingFormComponent,
    DdcllcSpeakingFormComponent,
    DdcllcTrainingFormComponent,

    // pages
    AboutPageComponent,
    BlogsPageComponent,
    BlogPageComponent,
    BooksPageComponent,
    ContactPageComponent,
    DDCPageComponent,
    MediaPageComponent,
    DDCLLCPageComponent,
    HomePageComponent,

    //for youtube safe url
    SafePipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    SlickCarouselModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    TimepickerModule,
    NgxMatTimepickerModule,
    NgxMaterialTimepickerModule,
    MatSelectModule,
    ReactiveFormsModule
    
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
