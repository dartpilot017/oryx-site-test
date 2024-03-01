import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { ContentfulService } from 'src/app/services/contentful.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-oryx-service',
  templateUrl: './oryx-service.component.html',
  styleUrls: ['./oryx-service.component.scss']
})
export class OryxServiceComponent implements OnInit {
  isEnglish!: boolean;

  @ViewChildren("url") private url!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    // console.log(this.url.length);
    this.url.changes.subscribe(() => {
      // console.log("Elements in the DOM!", this.url.length);
      // console.log(this.url.first.nativeElement.innerText);
      this.excelUrl = this.url.first.nativeElement.innerText;
      this.loadExcelSheet('https:' + this.excelUrl);
    });
  }

  currentPath: string = 'none';
  excelJsonData: any[] = [];
  excelUrl: string = '';
  oryxService$: Observable<any> | undefined;
  referencedEntry$: { [key: string]: Observable<any> } = {};

  constructor(private router: Router, private contentfulService: ContentfulService, private http: HttpClient, private _elementRef : ElementRef, private languageService: LanguageService) {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.languageService.isEnglish$.subscribe((isEnglish: boolean) => {
          this.isEnglish = isEnglish;
          this.currentPath = event.url;
        // console.log('Current route path:', this.currentPath);
        this.fetchOryxService();
        });
        
      }
    });

    this.loadExcelSheet('https:' + '//assets.ctfassets.net/pntywuu2cdre/4g61tnOaFAjotCMKlbSxn4/65989ff4a2e7d8d5d33a4a69eab1a21b/OryxHR_Table.xlsx');

  }

  ngOnInit() { }

  fetchOryxService() {
    if (this.isEnglish) {
      this.oryxService$ = this.contentfulService
        .getAllEntries('oryxServicePage')
        .pipe(
          map((oryxService) => {
            const filteredItems =
              oryxService?.items?.filter(
                (item) => item.fields['routePath'] === this.currentPath
              ) || [];
            return { ...oryxService, items: filteredItems };
          }),
          map((oryxService) => {
            const contentItems = oryxService?.items[0]?.fields?.['content'];
            if (Array.isArray(contentItems)) {
              contentItems.forEach((content: any) => {
                if (content.fields.features) {
                  content.fields.features.forEach((feature: any) => {
                    if (
                      feature.sys &&
                      feature.sys.type === 'Link' &&
                      feature.sys.linkType === 'Entry'
                    ) {
                      const entryId = feature.sys.id;
                      if (!this.referencedEntry$[entryId]) {
                        this.referencedEntry$[entryId] =
                          this.contentfulService.getEntryById(entryId);
                      }
                    }
                  });
                }
              });
            }
            return oryxService;
          })
        );
    } else {
      this.oryxService$ = this.contentfulService
        .getAllEntries('oryxServicePage', 'fr')
        .pipe(
          map((oryxService) => {
            const filteredItems =
              oryxService?.items?.filter(
                (item) => item.fields['routePath'] === this.currentPath
              ) || [];
            return { ...oryxService, items: filteredItems };
          }),
          map((oryxService) => {
            const contentItems = oryxService?.items[0]?.fields?.['content'];
            if (Array.isArray(contentItems)) {
              contentItems.forEach((content: any) => {
                if (content.fields.features) {
                  content.fields.features.forEach((feature: any) => {
                    if (
                      feature.sys &&
                      feature.sys.type === 'Link' &&
                      feature.sys.linkType === 'Entry'
                    ) {
                      const entryId = feature.sys.id;
                      if (!this.referencedEntry$[entryId]) {
                        this.referencedEntry$[entryId] =
                          this.contentfulService.getEntryById(entryId, 'fr');
                      }
                    }
                  });
                }
              });
            }
            return oryxService;
          })
        );
    }
  }

  loadExcelSheet(excelSheetUrl: string) {
    this.http.get(excelSheetUrl, { responseType: 'arraybuffer' }).subscribe(response => {
      const data: any = new Uint8Array(response);
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
      const worksheetName: string = workbook.SheetNames[0]; // Assuming the first sheet is the one to be read
      const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetName];
      this.excelJsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      // console.log(this.excelJsonData);
    });
  }

  getMaxNumberOfProperties(jsonData: any[]): number {
    let maxProperties = 0;
    for (const obj of jsonData) {
      const numProperties = Object.keys(obj).length;
      if (numProperties > maxProperties) {
        maxProperties = numProperties;
      }
    }
    return maxProperties;
  }

  getObjectKeys(obj: object): string[] {
    return Object.keys(obj);
  }

  getObjectEntries(obj: object): [string, any][] {
    return Object.entries(obj);
  }

}
