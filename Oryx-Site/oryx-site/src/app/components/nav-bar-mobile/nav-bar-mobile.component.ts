import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { LanguageService } from 'src/app/services/language.service';

interface NavLanguage {
  imagePATH: string;
  name: string;
  locale: string;
}

@Component({
  selector: 'app-nav-bar-mobile',
  templateUrl: './nav-bar-mobile.component.html',
  styleUrls: ['./nav-bar-mobile.component.scss'],
})
export class NavBarMobileComponent implements OnInit {
  constructor(
    private contentfulService: ContentfulService,
    private languageService: LanguageService
  ) {}

  oryxContacts$: Observable<any> | undefined;
  isEnglish!: boolean;
  isLangClicked: boolean = true;
  selectedLanguage: string = 'en';

  ngOnInit(): void {
    this.oryxContacts$ = this.contentfulService.getAllEntries('oryxContacts');
    this.languageService.isEnglish$.subscribe((isEnglish: boolean) => {
      this.isEnglish = isEnglish;
    });
  }

  toggleLang() {
    this.isLangClicked = !this.isLangClicked;
  }

  changeLanguage(language: string): void {
    this.selectedLanguage = language;
    if ((this.isEnglish = language === 'en')) {
      this.isEnglish = true;
      this.languageService.setLanguage(true);
    } else {
      this.isEnglish = false;
      this.languageService.setLanguage(false);
    }

    this.languageService.setLanguage(this.isEnglish);
  }

  navItems: {  name?: string;
    french?: string;
    route?: string;
    language?: NavLanguage[]; }[] = [
    { name: 'Home', french: 'Maison', route: '/home' },
    { name: 'About Us', french: 'À propos de nous', route: '/about-us' },
    { name: 'Products', french: 'Des produits', route: '/products' },
    { name: 'Demo', french: 'Démo', route: '/request-demo' },
    { name: 'Blog', french: 'Blog', route: '/oryx-blog' },
    { name: 'Contact Us', french: 'Contactez-nous', route: '/contact-us' },
    {
      language: [
        { imagePATH: '../../../assets/usa.svg', name: 'English', locale: 'en' },
        { imagePATH: '../../../assets/french.svg', name: 'French', locale: 'fr' },
      ],
    },
  ];

  isNavbarOpen: boolean = false;

  isDropdownOpen: boolean = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen
  }
}
