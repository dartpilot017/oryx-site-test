import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';

interface Button {
  text: string;
  french: string;
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
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;
  isEnglish!: boolean;

  constructor(
    private contentfulService: ContentfulService,
    private languageService: LanguageService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  blogList$: Observable<any> | undefined;

  blogPosts: BlogPost[] = [];
  filteredBlogPosts: BlogPost[] = [];
  displayedBlogPosts: BlogPost[] = [];
  recentBlogPosts: BlogPost[] = [];
  noMoreBlogPosts: boolean = false;
  searchResultsEmpty: boolean = false;
  tagIsEmpty: boolean = false;

  n: number = 6;
  m: number = 4;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;

  selectedTag: string = 'View all';
  searchQuery: string = '';

  buttons: Button[] = [
    { text: 'View all', french: 'Voir tout', selected: true },
    { text: 'Application Development', french: 'Développement d\'applications', selected: false },
    { text: 'Business Management', french: 'Gestion d\'entreprise', selected: false },
    { text: 'ERP', french: 'ERP', selected: false },
    { text: 'HR', french: 'HEURE', selected: false },
    { text: 'Lifestyle', french: 'Mode de vie', selected: false },
    { text: 'Payroll', french: 'Paie', selected: false },
  ];

  ngOnInit(): void {
    this.blogList$ = this.contentfulService.getAllEntries('blogList');

    // Language switch
    this.languageService.isEnglish$.subscribe(
      (isEnglish: boolean) => {
        this.isEnglish = isEnglish;
        this.initializeLanguage();
      }
    );
  }

  initializeLanguage(): void {
    if (this.isEnglish) {
      this.blogList$ = this.contentfulService.getAllEntries('blogList');
    } else {
      this.blogList$ = this.contentfulService.getAllEntries('blogList', 'fr');
    }

    this.blogList$?.subscribe((blogList: any) => {
      // console.log('Blog List:', blogList);

      this.blogPosts = [];

      blogList.items[0].fields.list.forEach((item: any) => {
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

      this.filteredBlogPosts = this.filterPosts();
      this.totalPages = Math.ceil(
        this.filteredBlogPosts.length / this.itemsPerPage
      );

      if (this.n >= this.filteredBlogPosts.length) {
        this.noMoreBlogPosts = true;
        this.displayedBlogPosts = this.filteredBlogPosts;
      } else {
        this.displayedBlogPosts = this.filteredBlogPosts.slice(0, this.n);
      }

      if (this.m >= this.filteredBlogPosts.length) {
        this.noMoreBlogPosts = true;
        this.recentBlogPosts = this.filteredBlogPosts;
      } else {
        this.recentBlogPosts = this.filteredBlogPosts.slice(0, this.m);
      }
    });
  }

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
      case 'Lifestyle':
        return 'application-development-tag';
      default:
        return '';
    }
  }

  onButtonClick(selectedButton: Button): void {
    this.buttons.forEach((btn) => (btn.selected = false));
    selectedButton.selected = true;
    this.selectedTag = selectedButton.text;

    this.filteredBlogPosts = this.filterPosts();

    // Check if the selected tag is empty
    this.tagIsEmpty = this.filteredBlogPosts.length === 0;

    this.displayedBlogPosts = this.filteredBlogPosts.slice(0, this.n);
    this.searchQuery = '';
  }

  filterPosts(): BlogPost[] {
    if (this.selectedTag === 'View all') {
      return this.blogPosts;
    } else if (
      this.blogPosts.filter((post) => post.tags.includes(this.selectedTag))
        .length === 0
    ) {
      this.tagIsEmpty = true;
      return [];
    } else {
      this.tagIsEmpty = false;
      return this.blogPosts.filter((post) =>
        post.tags.includes(this.selectedTag)
      );
    }
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
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredBlogPosts = this.filteredBlogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query) ||
          post.date.toLowerCase().includes(query) ||
          post.preview.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    this.displayedBlogPosts = this.filteredBlogPosts.slice(0, this.n);

    this.searchResultsEmpty = this.filteredBlogPosts.length === 0;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(
      this.filteredBlogPosts.length / this.itemsPerPage
    );
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  goToPage(page: number): void {
    if (
      page >= 1 &&
      page <= Math.ceil(this.filteredBlogPosts.length / this.itemsPerPage)
    ) {
      this.currentPage = page;
      this.fetchAndUpdateBlogPosts('slide-in');
    }
  }

  async loadNextPage(): Promise<void> {
    this.currentPage++;
    await this.fetchAndUpdateBlogPosts('slide-in');
    this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  async loadPreviousPage(): Promise<void> {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.fetchAndUpdateBlogPosts('slide-out');
      this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private async fetchAndUpdateBlogPosts(
    animationClass: 'slide-in' | 'slide-out'
  ): Promise<void> {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    if (startIndex >= this.filteredBlogPosts.length) {
      this.noMoreBlogPosts = true;
      this.displayedBlogPosts = this.filteredBlogPosts;
    } else {
      this.noMoreBlogPosts = false;

      const nextBlogPosts = this.filteredBlogPosts.slice(startIndex, endIndex);

      // Fetch additional blog posts from Contentful if needed
      if (endIndex > this.displayedBlogPosts.length) {
        const additionalPostsObservable =
          await this.contentfulService.getAdditionalEntries(
            'blogList',
            endIndex - this.displayedBlogPosts.length,
            startIndex
          );

        additionalPostsObservable.subscribe((additionalPosts: any) => {
          const updatedBlogPosts = additionalPosts.items.map((item: any) => ({
            id: item.sys.id,
            title: item.fields.title,
            author: item.fields.author,
            date: item.fields.dateAndTime,
            tags: item.fields.tags,
            imgUrl: item.fields.image.fields.file.url,
            preview: item.fields.preview,
            animationClass: animationClass,
          }));

          this.displayedBlogPosts = [...nextBlogPosts, ...updatedBlogPosts];
        });
      } else {
        this.displayedBlogPosts = nextBlogPosts.map((post) => ({
          ...post,
          animationClass: animationClass,
        }));
      }
    }
  }

  getVisiblePages(): (number | 'dot')[] {
    const pageCount = Math.ceil(
      this.filteredBlogPosts.length / this.itemsPerPage
    );
    const visiblePages: (number | 'dot')[] = [];

    // Determine the starting page based on the current page
    let startPage = 1;
    if (this.currentPage > 10) {
      startPage = Math.max(this.currentPage - 4, 1);
    }

    // Show the first 10 pages or all pages if there are fewer than 10
    for (let i = startPage; i <= Math.min(startPage + 9, pageCount); i++) {
      visiblePages.push(i);
    }

    // Show dots if there are more than 10 pages
    if (pageCount > 10 && startPage + 9 < pageCount) {
      const currentPageIndex = this.currentPage - startPage;
      if (currentPageIndex >= 0 && currentPageIndex < 10) {
        visiblePages.splice(currentPageIndex, 1, this.currentPage);
      } else {
        visiblePages.splice(4, 3, 'dot');
      }
    }

    return visiblePages;
  }
}
