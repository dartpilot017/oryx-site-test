import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


import { MarkdownModule } from 'ngx-markdown';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { };


import { LoaderComponent } from './components/loader/loader.component';



/*--COMPONENTS IMPORT--*/
import { FooterComponent } from './components/footer/footer.component';
import { NavBarDesktopComponent } from './components/nav-bar-desktop/nav-bar-desktop.component';
import { NavBarMobileComponent } from './components/nav-bar-mobile/nav-bar-mobile.component';
import { ProductsComponent } from './sections/products/products.component';
import { SliderComponent } from './components/slider/slider.component';
import { ProductNavBarComponent } from './components/product-nav-bar/product-nav-bar.component';
import { ServiceNavBarComponent } from './components/service-nav-bar/service-nav-bar.component';
import { DemoRequestComponent } from './components/demo-request/demo-request.component';


/*--FORMS IMPORT--*/
import { DemoRequestFormComponent } from './forms/demo-request-form/demo-request-form.component';


/*--PAGES--*/
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactUsPageComponent } from './pages/contact-us-page/contact-us-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';


/*--SECTION IMPORT--*/
import { OurServicesSectionComponent } from './sections/our-services-section/our-services-section.component';
import { MissionVisionSectionComponent } from './sections/mission-vision-section/mission-vision-section.component';
import { DemoRequestButtonComponent } from './buttons/demo-request-button/demo-request-button.component';
import { BlurbContentComponent } from './components/blurb-content/blurb-content.component';
import { BlurbSectionComponent } from './sections/blurb-section/blurb-section.component';
import { ChooseMiaComponent } from './components/choose-mia/choose-mia.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { ServicePageImageComponent } from './components/service-page-image/service-page-image.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { RecentBlogComponent } from './components/recent-blog/recent-blog.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';

@NgModule({
  declarations: [
    AppComponent,

    //COMPONENTS
    FooterComponent,
    NavBarDesktopComponent,
    NavBarMobileComponent,
    ProductsComponent,
    SliderComponent,
    ProductNavBarComponent,
    ServiceNavBarComponent,
    DemoRequestComponent,

    //FORMS
    DemoRequestFormComponent,

    //PAGES
    HomePageComponent,
    ServicesPageComponent,
    ProductsPageComponent,

    //SECTIONS
    OurServicesSectionComponent,
    MissionVisionSectionComponent,
    DemoRequestButtonComponent,
    
    ContactUsPageComponent,
    LoaderComponent,
    BlurbContentComponent,
    BlurbSectionComponent,
    ChooseMiaComponent,
    
    ServicePageImageComponent,
         BlogPageComponent,
         RecentBlogComponent,
         BlogComponent,
         BlogListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
