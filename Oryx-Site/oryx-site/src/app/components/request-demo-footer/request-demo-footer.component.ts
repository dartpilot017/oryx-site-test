import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-request-demo-footer',
  templateUrl: './request-demo-footer.component.html',
  styleUrls: ['./request-demo-footer.component.scss']
})
export class RequestDemoFooterComponent implements OnInit {
  
  constructor(private router: Router, private languageService: LanguageService) { }
  isEnglish!: boolean;

  ngOnInit(): void {
    this.languageService.isEnglish$.subscribe(
      (isEnglish: boolean) => {
        this.isEnglish = isEnglish;
      }
    );
  }

  redirectToRequestDemo() {
    this.router.navigate(['/request-demo']);
  }
}
