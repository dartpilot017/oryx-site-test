import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactUsPageComponent } from './pages/contact-us-page/contact-us-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { DemoRequestButtonComponent } from './buttons/demo-request-button/demo-request-button.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { BlogComponent } from './pages/blog/blog.component';

const routes: Routes = [
  { path: 'home', title: 'MIA | Home', component: HomePageComponent },
  {
    path: 'contact-us',
    title: 'MIA | Contact',
    component: ContactUsPageComponent,
  },

  {
    path: 'oryx-hr',
    title: 'MIA | Oryx HR Product',
    component: ProductsPageComponent,
  },

  {
    path: 'school-pickUp',
    title: 'MIA | School Pick-Up Product',
    component: ProductsPageComponent,
  },

  {
    path: 'blog',
    title: 'MIA | Blog',
    component: BlogPageComponent,
  },
  { path: 'mia/:id', component: BlogComponent },

  {
    path: 'business-consultancy',
    title: 'MIA | Business Consultancy',
    component: ServicesPageComponent,
  },

  {
    path: 'professional-services',
    title: 'MIA | Professional Services',
    component: ServicesPageComponent,
  },

  {
    path: 'erp-solutions',
    title: 'MIA | Enterprise Resource Planning (ERP) Solutions',
    component: ServicesPageComponent,
  },

  {
    path: 'hrp-and-payroll-solutions',
    title: 'MIA | HR and Payroll Solutions',
    component: ServicesPageComponent,
  },

  {
    path: 'application-development',
    title: 'MIA | Application Development',
    component: ServicesPageComponent,
  },

  { path: 'demo-request', component: DemoRequestButtonComponent },
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
