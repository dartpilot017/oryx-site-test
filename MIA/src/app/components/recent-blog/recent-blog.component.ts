import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';


interface Button {
  text: string;
  selected: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  tags: string[];
  imgUrl: string;
  preview: string;
  animationClass?: 'slide-in' | 'slide-out';
}

@Component({
  selector: 'app-recent-blog',
  templateUrl: './recent-blog.component.html',
  styleUrls: ['./recent-blog.component.scss']
})
export class RecentBlogComponent {
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  constructor(private contentfulService: ContentfulService) {}

  blogList$: Observable<any> | undefined;

  blogPosts: BlogPost[] = [];
  filteredBlogPosts: BlogPost[] = [];
  recentBlogPosts: BlogPost[] = [];
  tagIsEmpty: boolean = false;
  selectedTag: string = 'View all';

  m: number = 4;


  ngOnInit(): void {
    this.blogList$ = this.contentfulService.getAllEntries('blogList');

    this.blogList$?.subscribe((blogList: any) => {
      blogList.items[0].fields.list.forEach((item: any) => {
        this.blogPosts.push({
          id: item.sys.id,
          title: item.fields.title,
          author: item.fields.authorsName,
          date: item.fields.dateAndTime,
          tags: item.fields.tags,
          imgUrl: item.fields.image.fields.file.url,
          preview: item.fields.preview,
        });
      });

      this.filteredBlogPosts = this.filterPosts();
      if (this.m >= this.filteredBlogPosts.length) {
        // this.noMoreBlogPosts = true;
        this.recentBlogPosts = this.filteredBlogPosts;
      } else {
        this.recentBlogPosts = this.filteredBlogPosts.slice(0, this.m);
      }
    });
  }

  filterPosts(): BlogPost[] {
    if (this.selectedTag === 'View all') {
      return this.blogPosts;
    } else if (this.blogPosts.filter((post) => post.tags.includes(this.selectedTag)).length === 0) {
      this.tagIsEmpty = true;
      return [];
    } else {
      this.tagIsEmpty = false;
      return this.blogPosts.filter((post) => post.tags.includes(this.selectedTag));
    }
  }

}
