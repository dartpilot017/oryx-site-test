# Deborah David Site
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

# Table of Contents
- [Angular Info](#angular-info)
- [Import Data from Contentful](#import-data-from-contentful)
    - [Display Text from Contentful](#display-text-from-contentful)
    - [Display Images from Contentful](#display-images-from-contentful)

# Angular Info
- Run `npm run dev:ssr` for a dev server.
  - Navigate to `http://localhost:4200/` to view the application.
- Run `npm run build` to build the project.
  - The build artifacts will be stored in the `dist/` directory.
- Run `ng generate component my-component --module app.module.ts` to generate a new component.
  - You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
- To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

<br/>

# Import Data from Contentful

To import data from Contentful, you can utilize the Contentful Service provided in this project. Follow the steps below to import different types of content:

1. First, make sure you have the necessary dependencies installed. If not, run the following command to install them:
   ```
   npm install contentful
   ```

2. In your component file, import the required modules and services:
   ```typescript
   import { Component, OnInit } from '@angular/core';
   import { Observable } from 'rxjs';
   import { ContentfulService } from 'src/app/services/contentful.service';
   ```

3. In this example we are importing _content type_ of __bookList__ from Contentful.<br/>Within your component class, initialize the `bookList$` variable as an `Observable<any>` or a more specific type that matches your data structure:
   ```typescript
   export class BooksComponent implements OnInit {
     bookList$: Observable<any> | undefined;

     constructor(private contentfulService: ContentfulService) { }

     ngOnInit(): void {
       // Use the Contentful Service to import the 'bookList' data
       this.bookList$ = this.contentfulService.getAllEntries('bookList');
     }
   }
   ```

4. In your HTML template file (`books.component.html`), you can use the `async` pipe to subscribe to the `bookList$` Observable and access the imported data:
   ```html
   <div *ngIf="(bookList$ | async) as bookList">
     <!-- Display the imported data here -->
   </div>
   ```

Now you are ready to import data of content type 'bookList' from Contentful into your HTML template. Adjust the code and data structure to fit your specific needs.

Please make sure to replace `'bookList'` with the appropriate content type you want to import throughout your project.

<br/>

## Display Text from Contentful

To display text from Contentful, you need to access it using the respective __Field ID__ assigned to each text field. Follow the example below to display the "header" of the "Official Pictures" section in your HTML template:

```html
<div *ngIf="(officialPictures$ | async) as officialPictures">
  <ng-container *ngIf="officialPictures.items[0].fields as fields">
    <h1>{{ fields['header'] }}</h1>
  </ng-container>
</div>
```

Explanation of the code:

1. The `officialPictures$` variable represents the Observable that contains the data fetched from Contentful.
2. The `*ngIf="(officialPictures$ | async) as officialPictures"` statement subscribes to the Observable and assigns the result to the `officialPictures` variable.
3. Inside the `<ng-container>` element, `officialPictures.items[0].fields` is assigned to the `fields` variable. This assumes that the "Official Pictures" section is the first item in the `officialPictures` array. Adjust the index (`[0]`) accordingly if needed.
4. The `{{ fields['header'] }}` expression displays the value of the "header" field within the `<h1>` element. Replace `'header'` with the actual Field ID corresponding to the desired text content.

Make sure to adapt the code to match your specific data structure and Field IDs in Contentful.

If you have multiple sections or want to display additional text fields, you can extend the code by adding more HTML elements and accessing the respective fields within the `fields` object.

<br/>

## Display Images from Contentful

To display images from Contentful, you can access them using their URL. Follow the example below to display a list of images from Contentful in your HTML template:

```html
<div *ngIf="(officialPictures$ | async) as officialPictures">
  <ng-container *ngIf="officialPictures.items[0].fields as fields">
    <div *ngIf="fields['profileImages'] as profileImages">
      <div *ngFor="let profileImage of profileImages">
        <img [src]="'https:' + profileImage.fields.file.url" alt="profile image">
      </div>
    </div>
  </ng-container>
</div>
```

Explanation of the code:

1. The `officialPictures$` variable represents the Observable that contains the data fetched from Contentful.
2. The `*ngIf="(officialPictures$ | async) as officialPictures"` statement subscribes to the Observable and assigns the result to the `officialPictures` variable.
3. Inside the `<ng-container>` element, `officialPictures.items[0].fields` is assigned to the `fields` variable. This assumes that the desired images are part of the first item in the `officialPictures` array. Adjust the index (`[0]`) if needed.
4. The `fields['profileImages']` expression retrieves the array of profile images from the `fields` object.
5. Within the nested `*ngFor` loop, each `profileImage` is iterated over.
6. The `<img>` element is used to display each image. The `[src]="'https:' + profileImage.fields.file.url"` attribute binding constructs the image URL by appending `'https:'` to the URL provided by Contentful. Adjust the path if your image URLs have a different structure.
7. The `alt="profile image"` attribute specifies alternative text for the image. Replace it with a descriptive alternative text for better accessibility.

Please note that the provided code assumes the presence of an array of images under the field ID `'profileImages'`. Adjust the field ID to match the actual field storing your images in Contentful.

Remember to adjust the code based on your specific data structure and field names in Contentful.

