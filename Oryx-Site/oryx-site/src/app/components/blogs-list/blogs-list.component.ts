import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { LanguageService } from 'src/app/services/language.service';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  tags: string[];
  imgUrl: string;
  preview: string;
}

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss'],
})
export class BlogsListComponent {
  constructor(
    private contentfulService: ContentfulService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  blogList$: Observable<any> | undefined;
  blogPosts: BlogPost[] = [];
  n: number = 6;
  isEnglish!: boolean;

  tagColors: { [key: string]: string } = {
    ERP: 'var(--erp-color, #F9F5FF)',
    HR: 'var(--hrm-color, #F0F9FF)',
    Payroll: 'var(--pr-color,#ECFDF3)',
    'Business Management': 'var(--bm-color,#fdecec)',
  };

  tagsColors: { [key: string]: string } = {
    ERP: 'var(--erp-color, #6941C6)',
    HR: 'var(--hrm-color, #026AA2)',
    Payroll: 'var(--pr-color,#027A48)',
    'Business Management': 'var(--bm-color,#7e0202)',
  };

  getTagStyles(tag: string): string {
    switch (tag) {
      case 'ERP':
        return 'erp-tag';
      case 'HR':
        return 'human-resource-management-tag';
      case 'Payroll':
        return 'payroll-tag';
      case 'Business Management':
        return 'business-management-tag';
      case 'Application Development':
        return 'application-development-tag';
      default:
        return '';
    }
  }

  ngOnInit(): void {
    this.languageService.isEnglish$.subscribe((isEnglish: boolean) => {
      this.isEnglish = isEnglish;
      if (this.isEnglish) {
        this.blogList$ = this.contentfulService.getAllEntries('blogList');

        this.blogList$?.subscribe((blogList: any) => {
          this.blogPosts = [];

          blogList.items[0].fields.list
            .slice(0, this.n)
            .forEach((item: any) => {
              this.blogPosts.push({
                id: item.sys.id,
                title: item.fields.title,
                author: item.fields.author,
                date: item.fields.dateAndTime,
                tags: item.fields.tags,
                imgUrl: item.fields.image.fields.file.url,
                preview: item.fields.preview,
              });
            });
        });
      } else {
        this.blogList$ = this.contentfulService.getAllEntries('blogList', 'fr');

        
        this.blogList$?.subscribe((blogList: any) => {
          this.blogPosts = [];

          blogList.items[0].fields.list
            .slice(0, this.n)
            .forEach((item: any) => {
              this.blogPosts.push({
                id: item.sys.id,
                title: item.fields.title,
                author: item.fields.author,
                date: item.fields.dateAndTime,
                tags: item.fields.tags,
                imgUrl: item.fields.image.fields.file.url,
                preview: item.fields.preview,
              });
            });
        });
      }
    });
    
  }

  reloadPage(blogPost: BlogPost) {
    // Navigate to the current route
    this.router.navigate(['/'], { skipLocationChange: true }).then(() => {
      this.router.navigate(['/oryx-blog', blogPost['id']]);
    });
  }
}
