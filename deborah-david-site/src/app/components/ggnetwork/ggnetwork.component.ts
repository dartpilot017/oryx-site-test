import { Component } from '@angular/core';

@Component({
  selector: 'app-ggnetwork',
  templateUrl: './ggnetwork.component.html',
  styleUrls: ['./ggnetwork.component.scss']
})
export class GGNetworkComponent {
  openWebsite(): void {
    const url = 'https://app.groupify.co/g/VySUmxEy8N8K';
    window.open(url, '_blank');
  }
}
