import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject: Subject<boolean> = new Subject<boolean>();
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor() { }

  private isLoading: boolean = false;

  startLoading() {
    this.isLoading = true;
    this.isLoadingSubject.next(this.isLoading);
  }

  stopLoading() {
    this.isLoading = false;
    this.isLoadingSubject.next(this.isLoading);
  }

  getLoadingState(): boolean {
    return this.isLoading;
  }
}
