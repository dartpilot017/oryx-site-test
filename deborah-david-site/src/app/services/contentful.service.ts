import { Injectable } from '@angular/core';
import { createClient, Entry, EntryCollection } from 'contentful';
import { from, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  constructor(public loadingService: LoadingService) { }

  private client = createClient({
    space: 'ozsq9m1w3o2q',
    accessToken: 'FYVoexQfmebgofEXKcOa9nfGwb8hoI_YRsgP43iKRiM'
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
}
