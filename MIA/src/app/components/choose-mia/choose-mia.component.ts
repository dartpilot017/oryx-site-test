import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-mia',
  templateUrl: './choose-mia.component.html',
  styleUrls: ['./choose-mia.component.scss']
})
export class ChooseMiaComponent {
  constructor(private router: Router) { }

  listField = [
    {title: "Team", description: "Experienced consultants and developers"},
    {title: "Tailored Solutions", description: "Customized solutions to fit your unique needs"},
    {title: "Industry Insights", description: "Staying ahead with the latest industry trends"}
  ]

  navigateToContactUs() {
    this.router.navigate(['/contact-us']);
  }
}
