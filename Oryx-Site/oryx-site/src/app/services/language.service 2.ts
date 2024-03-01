import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private isEnglishSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); // defa
  public isEnglish$: Observable<boolean> = this.isEnglishSubject.asObservable();


  constructor() { }

  setLanguage(isEnglish: boolean): void {
    this.isEnglishSubject.next(isEnglish);
  }
  getLanguage(): boolean {
    return this. isEnglishSubject.getValue();
  }
}
