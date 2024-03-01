import { Injectable } from '@angular/core';
import { createClient, Entry, EntryCollection } from 'contentful';
import { from, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  [x: string]: any;
  

  constructor(public loadingService: LoadingService) { }

  private client = createClient({
    space: '3rpex1ghwtlb',
    accessToken: 'p110sVRVFVW1v3YmIqKaZdFPxuaY-4D-lo--lh4A8fQ'
  });

  getAllEntries(contentType: string): Observable<EntryCollection<any>> {
    this.loadingService.startLoading();

    const promise = this.client.getEntries({
      content_type: contentType,
    });

    const entries$ = from(promise);
    entries$.subscribe({
      complete: () => this.loadingService.stopLoading(),
    });

    return entries$;
  }

  getEntryById(entryId: string): Observable<Entry<any>> {
    this.loadingService.startLoading();

    const promise = this.client.getEntry(entryId);

    const entry$ = from(promise);
    entry$.subscribe({
      complete: () => this.loadingService.stopLoading(),
    });

    return entry$;
  }

  

  getAdditionalEntries(contentType: string, limit: number, skip: number): Observable<any> {
    this.loadingService.startLoading();

    const promise = this.client.getEntries({
      content_type: contentType,
      limit,
      skip,
    });

    const entries$ = from(promise);
    entries$.subscribe({
      complete: () => this.loadingService.stopLoading(),
    });

    return entries$;
  }
}
