import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-price-cards',
  templateUrl: './price-cards.component.html',
  styleUrls: ['./price-cards.component.scss']
})
export class PriceCardsComponent {

  constructor(private contentfulService: ContentfulService) { }

  priceCards$: Observable<any> | undefined;
  priceList: {name: string, cost: string, services: string[], isSelected: boolean, isExpanded: boolean}[] = [];
  serviceList: string[] = [
    "Individual one-on-one coaching with Deborah David",
    "2 Coaching sessions per month each session lasting approximately one hour",
    "Sessions can be online or a mutually agreed upon location",
    "25% discount for any of your company's workshops run by DDCLLC",
    "2 days of shadowing, facilitation of two meetings of your choice (up to 2 hours each)",
    "2 unscheduled phone calls",
    "2 emails per month",
    "12 months"
  ];

  ngOnInit(): void {
    this.priceCards$ = this.contentfulService.getAllEntries('priceCards');

    // Get list from priceCards
    this.priceCards$?.subscribe((priceCards: any) => {
      priceCards.items[0].fields.list.forEach((priceCard: any) => {
        this.priceList.push({
          name: priceCard.fields.name,
          cost: priceCard.fields.cost,
          services: priceCard.fields.services,
          isSelected: false,
          isExpanded: false
        });
      });
    });
  }

  selectPriceCard(index: number) {
    this.priceList.forEach((priceCard, i) => {
      if (i === index) {
        priceCard.isSelected = true;
      } else {
        priceCard.isSelected = false;
      }
    });
  }

  expandPriceCard(index: number) {
    this.priceList.forEach((priceCard, i) => {
      if (i === index) {
        priceCard.isExpanded = true;
      } else {
        priceCard.isExpanded = false;
      }
    });
  }
}
