import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  preview: string
}

@Component({
  selector: 'app-latest-blogs',
  templateUrl: './latest-blogs.component.html',
  styleUrls: ['./latest-blogs.component.scss']
})
export class LatestBlogsComponent implements OnInit {
  id: string = '';

  private routeSubscription!: Subscription;

  constructor(
    private contentfulService: ContentfulService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  blogList$: Observable<any> | undefined;

  blogPosts: BlogPost[] = [];

  ngOnInit(): void {
    this.id = this.getRouteId();
    this.getBlogList(this.id);

    // on route id change, get new blog list
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = this.getRouteId();
      this.getBlogList(this.id);
    });
  }

  // Unsubscribe from the route parameter changes to avoid memory leaks
  ngOnDestroy() { this.routeSubscription.unsubscribe(); }

  getRouteId(): string {
    const url = this.location.path();
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  getBlogList(id: string): void {
    this.blogPosts = [];
    this.blogList$ = this.contentfulService.getAllEntries('blogList');

    this.blogList$?.subscribe((blogList: any) => {
      blogList.items[0].fields.list.forEach((item: any) => {
        if (item.sys.id !== id) {
          this.blogPosts.push({
            id: item.sys.id,
            title: item.fields.title,
            author: item.fields.author,
            date: item.fields.date,
            tags: item.fields.tags,
            imgUrl: item.fields.image.fields.file.url,
            preview: item.fields.preview
          });
        }
      });
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

  redirectToBlogs(): void {
    this.router.navigate(['/blogs']);
  }

}
