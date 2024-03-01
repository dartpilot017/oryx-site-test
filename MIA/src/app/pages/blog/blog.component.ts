import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  authorPosition: string;
  firmName: string;
  support: string;
  date: string;
  tags: string[];
  imgUrl: string;
  authorImgUrl: string;
  facebook: string;
  tweet: string;
  linkedIn: string;
  article: string;
}

interface Icon {
  name: string;
  file: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogComponent {
  @ViewChild('copyLinkInput', { static: false }) copyLinkInput!: ElementRef;

  id: string = '';

  private routeSubscription!: Subscription;

  constructor(
    private contentfulService: ContentfulService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private location: Location,
    private snackBar: MatSnackBar
  ) {}

  blogPost$: Observable<any> | undefined;
  blog: BlogPost = {
    id: '',
    title: '',
    author: '',
    authorPosition: '',
    firmName: '',
    support: '',
    date: '',
    tags: [],
    imgUrl: '',
    authorImgUrl: '',
    facebook: '',
    tweet: '',
    linkedIn: '',
    article: '',
  };

  icons: Icon[] = [
    { name: 'twitter', file: 'twitter-blog.svg' },
    { name: 'facebook', file: 'facebook-blog.svg' },
    { name: 'linkedIn', file: 'linkedIn-blog.svg' },
  ];

  ngOnInit(): void {
    this.id = this.getRouteId();
    this.getBlog(this.id);

    // on route id change, get new blog post
    this.routeSubscription = this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.id = paramMap.get('id') || '';
        this.getBlog(this.id);
      }
    );
  }

  // Unsubscribe from the route parameter changes to avoid memory leaks
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  getRouteId(): string {
    const url = this.location.path();
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  getBlog(id: string): void {
    // get blog post
    this.blogPost$ = this.contentfulService.getEntryById(id);

    // assign blog post to blog
    this.blogPost$?.subscribe((blogPost: any) => {
      this.blog.id = blogPost.sys.id;
      this.blog.title = blogPost.fields.title;
      this.blog.author = blogPost.fields.author;
      this.blog.authorPosition = blogPost.fields.authorsPosition;
      this.blog.firmName = blogPost.fields.authorsCompanyName;
      this.blog.support = blogPost.fields.supportingText;
      this.blog.date = blogPost.fields.dateAndTime;
      this.blog.tags = blogPost.fields.tags;
      this.blog.imgUrl = blogPost.fields.image.fields.file.url;
      this.blog.authorImgUrl = blogPost.fields.authorImage.fields.file.url;
      this.blog.facebook = blogPost.fields.facebook;
      this.blog.tweet = blogPost.fields.twitter;
      this.blog.linkedIn = blogPost.fields.linkedIn;
      this.blog.article = blogPost.fields.article;

      // change page title using Title service
      this.titleService.setTitle(this.blog.title + '-oryx-blog - Oryx Africa');
    });
  }
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
        return 'hr-tag';
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

  copyLink() {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      this.snackBar.open('Link copied to clipboard', '', { duration: 5000 });
    });
  }

  navigateToBLog() {
    this.router.navigate(['/mia-blog']);
  }
}
