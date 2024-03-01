import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  tags: string[];
  imgUrl: string;
  article: string
}

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.scss']
})
export class BlogArticleComponent implements OnInit {
  id: string = '';

  private routeSubscription!: Subscription;

  constructor(
    private contentfulService: ContentfulService,
    private route: ActivatedRoute,
    private titleService: Title,
    private location: Location
  ) { }

  blogPost$: Observable<any> | undefined;
  blog: BlogPost = {id: '', title: '', author: '', date: '', tags: [], imgUrl: '', article: ''};

  ngOnInit(): void {
    this.id = this.getRouteId();
    this.getBlog(this.id);

    // on route id change, get new blog post
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = this.getRouteId();
      this.getBlog(this.id);
    });
  }

  // Unsubscribe from the route parameter changes to avoid memory leaks
  ngOnDestroy() { this.routeSubscription.unsubscribe(); }

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
      this.blog.date = blogPost.fields.date;
      this.blog.tags = blogPost.fields.tags;
      this.blog.imgUrl = blogPost.fields.image.fields.file.url;
      this.blog.article = blogPost.fields.article;

      // change page title using Title service
      this.titleService.setTitle('Deborah David | ' + this.blog.title);
    });
  }

  getTagStyles(tag: string): string {
    switch (tag) {
      case 'Professional': return 'professional-tag';
      case 'Parenting': return 'parenting-tag';
      case 'Spiritual': return 'spiritual-tag';
      case 'Personal': return 'personal-tag';
      default: return '';
    }
  }
}
