import { Component, OnInit } from '@angular/core';
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
  preview: string
}

@Component({
  selector: 'app-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrls: ['./blogs-page.component.scss']
})
export class BlogsPageComponent implements OnInit {

  constructor(private contentfulService: ContentfulService) { }

  blogList$: Observable<any> | undefined;

  blogPosts: BlogPost[] = [];
  filteredBlogPosts: BlogPost[] = [];
  displayedBlogPosts: BlogPost[] = [];
  noMoreBlogPosts: boolean = false;
  n: number = 4;

  selectedTag: string = 'All';
  searchQuery: string = '';

  buttons: Button[] = [
    { text: 'All', selected: true },
    { text: 'Professional', selected: false },
    { text: 'Parenting', selected: false },
    { text: 'Spiritual', selected: false },
    { text: 'Personal', selected: false }
  ];


  ngOnInit(): void {

    this.blogList$ = this.contentfulService.getAllEntries('blogList');

    this.blogList$?.subscribe((blogList: any) => {
      blogList.items[0].fields.list.forEach((item: any) => {
        this.blogPosts.push({
          id: item.sys.id,
          title: item.fields.title,
          author: item.fields.author,
          date: item.fields.date,
          tags: item.fields.tags,
          imgUrl: item.fields.image.fields.file.url,
          preview: item.fields.preview
        });
      });

      this.filteredBlogPosts = this.filterPosts();

      if (this.n >= this.filteredBlogPosts.length) {
        this.noMoreBlogPosts = true;
        this.displayedBlogPosts = this.filteredBlogPosts;
      } else {
        this.displayedBlogPosts = this.filteredBlogPosts.slice(0, this.n);
      }
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

  onButtonClick(selectedButton: Button): void {
    this.buttons.forEach(btn => btn.selected = false);
    selectedButton.selected = true;
    this.selectedTag = selectedButton.text;
    this.filteredBlogPosts = this.filterPosts();
    this.displayedBlogPosts = this.filteredBlogPosts.slice(0, this.n);
    this.searchQuery = '';
  }

  filterPosts(): BlogPost[] {
    if (this.selectedTag === 'All') {
      return this.blogPosts;
    }
    return this.blogPosts.filter(post => post.tags.includes(this.selectedTag));
  }

  loadMoreBlogPosts(): void {
    this.n += 2;
    if (this.n >= this.filteredBlogPosts.length) {
      this.noMoreBlogPosts = true;
      this.displayedBlogPosts = this.filteredBlogPosts;
    } else {
      this.displayedBlogPosts = this.filteredBlogPosts.slice(0, this.n);
    }
  }

  search(): void {
    this.filteredBlogPosts = this.filterPosts();
    if (this.searchQuery.trim() !== '') {
      this.filteredBlogPosts = this.filteredBlogPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
    this.displayedBlogPosts = this.filteredBlogPosts.slice(0, this.n);
  }

}
