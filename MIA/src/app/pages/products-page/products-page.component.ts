import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';


interface ProductButton {
  name: string;
  header: string;
  imageUrl: string;
  sideButton: SideButton[];
}

interface ButtonContent extends ProductButton {
  selected: boolean;
  selectedSideButton?: SideButton;
}

interface SideButton {
  [x: string]: any;
  buttonName: string;
  buttonTitle: string;
  buttonDescription: string;
  selected: boolean;
}

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPageComponent implements OnInit {
  @ViewChildren('url') private url!: QueryList<ElementRef>;

  currentPath: string = 'none';
  productsDescription$: Observable<any> | undefined;
  referencedEntry$: { [key: string]: Observable<any> } = {};
  selectedProductButton: ButtonContent | undefined;
  selectedSideButton: SideButton | undefined;
  productButton: ButtonContent[] = [];
  isNavbarOpen: boolean = false;

  constructor(
    private router: Router,
    private contentfulService: ContentfulService,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentPath = event.url;
          this.fetchProducts();
        }
      });
  }
  ngOnInit(): void {}


  fetchProducts() {
    this.productsDescription$ = this.contentfulService
      .getAllEntries('productsDescriptionPage')
      .pipe(
        map((productsDescription) => {
          const filteredItems =
          productsDescription?.items?.filter(
              (item) => item.fields['routePath'] === this.currentPath
            ) || [];
          return { ...productsDescription, items: filteredItems };
        }),
       
        map((productsDescription) => {
          const contentButton = productsDescription?.items[0]?.fields?.[
            'buttonContent'
          ] as [];
          const contentItems: ButtonContent[] = [];

          if (Array.isArray(contentButton)) {
            contentButton.forEach((buttonContent: any) => {
              if (buttonContent.fields.sideButton) {
                buttonContent.fields.sideButton.forEach(
                  (sideButton: any, index: number) => {
                    if (index === 0) {
                      sideButton.selected = true;
                    }
                    if (this.isLink(sideButton)) {
                      const entryId = sideButton.sys.id;
                      if (!this.referencedEntry$[entryId]) {
                        this.referencedEntry$[entryId] =
                          this.contentfulService.getEntryById(entryId);
                      }
                    }
                  }
                );
              }

              const buttonItem: ButtonContent = {
                name: buttonContent.fields.name,
                imageUrl: buttonContent.fields.imageMedia.fields['file'].url,
                header: buttonContent.fields.header,
                sideButton: buttonContent.fields.sideButton || [],
                selected: false,
              };

              contentItems.push(buttonItem);
              if (contentItems.length > 0) {
                contentItems[0].selected = true;
                this.selectedProductButton = contentItems[0];
                this.selectedSideButton = contentItems[0].selectedSideButton;
              }
              if (buttonItem.sideButton.length > 0) {
                buttonItem.selectedSideButton = buttonItem.sideButton[0];
              }
            });
          }

          this.productButton = contentItems;
          return productsDescription;
        })
      );
      this.productsDescription$.subscribe(() => {
        this.cdr.detectChanges();
      })
  }
  onProductButtonClick(index: number) {
    this.productButton.forEach((btn, i) => (btn.selected = i === index));
    this.selectedProductButton = this.productButton[index];
    this.selectedSideButton = this.selectedProductButton?.sideButton[0];
    
    if (this.selectedProductButton) {
      this.selectedProductButton.sideButton.forEach((btn) => {
        btn.selected = btn === this.selectedSideButton;
      });
    }
  }
  

  updateReferencedEntry(sideButton: SideButton) {
    if (this.isLink(sideButton)) {
      const entryId = sideButton.sys.id;
      this.referencedEntry$[entryId] =
        this.contentfulService.getEntryById(entryId);

      // Update selected sideButton for the current selectedProductButton
      if (this.selectedProductButton) {
        this.selectedProductButton.sideButton.forEach((btn) => {
          btn.selected = btn === sideButton;
        });
        this.selectedSideButton = sideButton;
      }
    }
  }

  isLink(sideButton: any): sideButton is {
    sys: { id: string; type: 'Link'; linkType: 'Entry' };
  } {
    return (
      sideButton &&
      sideButton.sys &&
      sideButton.sys.type === 'Link' &&
      sideButton.sys.linkType === 'Entry'
    );
  }

  toggleNavbar() { 
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}