import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './pages/about-page/about-page.component';
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { DDCPageComponent } from './pages/ddc-page/ddc-page.component';
import { DDCLLCPageComponent } from './pages/ddcllc-page/ddcllc-page.component';
import { ExpressionsTabsComponent } from './sections/expressions-tabs/expressions-tabs.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MediaPageComponent } from './pages/media-page/media-page.component';

const routes: Routes = [
  {path:'about', title: 'Deborah David | About', component: AboutPageComponent},
  {path: 'blogs', title: 'Deborah David | Blogs', component: BlogsPageComponent},
  {path: 'blogs/:id', component: BlogPageComponent}, // title is set in BlogPageComponent
  {path:'books', title: 'Deborah David | Books', component: BooksPageComponent},
  {path:'contact', title: 'Deborah David | Contact', component: ContactPageComponent},
  {path:'ddc', title: 'Deborah David | DDC', component: DDCPageComponent},
  {path:'ddcllc', title: 'Deborah David | DDCLLC', component: DDCLLCPageComponent},
  {path:'expressions', title: 'Deborah David | Expressions', component: ExpressionsTabsComponent },
  {path:'home', title: 'Deborah David | Home', component: HomePageComponent},
  {path:'media', title: 'Deborah David | Media', component: MediaPageComponent},
  {path:'', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
