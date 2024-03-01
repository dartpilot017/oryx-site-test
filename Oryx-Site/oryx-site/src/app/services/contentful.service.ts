import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { from, Observable } from 'rxjs';

import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  constructor(public loadingService: LoadingService) {}

  private client = createClient({
    space: 'pntywuu2cdre',
    accessToken: 'Ra0OewZgtirLnxIFP_PBrTYN8NDluGhaJLD4AAH7b-g',
  });

  getAllEntries(contentType: string, locale: string = 'en-US') {
    this.loadingService.startLoading();

    // const promise =

    const promise = this.client.getEntries({
      content_type: contentType,
      locale: locale,
    });

    const entries$ = from(promise);
    entries$.subscribe({
      complete: () => this.loadingService.stopLoading(),
    });

    return entries$;
  }

  getEntryById(entryId: string, locale: string = 'en-US'): Observable<Entry<any>> {
    this.loadingService.startLoading();
  
    const promise = this.client.getEntry(entryId, { locale });
  
    const entry$ = from(promise);
    entry$.subscribe({
      complete: () => this.loadingService.stopLoading(),
    });
  
    return entry$;
  }
  

  getAdditionalEntries(
    contentType: string,
    limit: number,
    skip: number
  ): Observable<any> {
    this.loadingService.startLoading();

    const promise = this.client.getEntries({
      content_type: contentType,
      limit,
      skip
    });

    const entries$ = from(promise);
    entries$.subscribe({
      complete: () => this.loadingService.stopLoading(),
    });

    return entries$;
  }
}
