import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-mission-vision-section',
  templateUrl: './mission-vision-section.component.html',
  styleUrls: ['./mission-vision-section.component.scss']
})
export class MissionVisionSectionComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) 
  { }

  missionStatementSection$: Observable<any> | undefined;

  ngOnInit(): void {
    this.missionStatementSection$ = this.contentfulService.getAllEntries('missionStatementSection')
  }

}
