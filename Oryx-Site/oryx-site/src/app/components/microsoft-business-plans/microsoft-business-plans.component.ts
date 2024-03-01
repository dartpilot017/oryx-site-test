import { Component } from '@angular/core';

interface Icon {
  name: string;
  path: string;
}

interface Plan {
  name: string;
  icons: Icon[];
}

@Component({
  selector: 'app-microsoft-business-plans',
  templateUrl: './microsoft-business-plans.component.html',
  styleUrls: ['./microsoft-business-plans.component.scss']
})
export class MicrosoftBusinessPlansComponent {

icons: Icon[] = [
  {name: "Exchange", path: "microsoft-exchange.png"},
  {name: "Teams", path: "microsoft-teams.png"},
  {name: "Sharepoint", path: "microsoft-sharepoint.png"},
  {name: "OneDrive", path: "microsoft-onedrive.png"},
  {name: "Outlook", path: "microsoft-outlook.png"},
  {name: "Word", path: "microsoft-word.png"},
  {name: "Excel", path: "microsoft-excel.png"},
  {name: "PowerPoint", path: "microsoft-powerpoint.png"},
  {name: "Publisher", path: "microsoft-publisher.png"},
  {name: "Access", path: "microsoft-access.png"},
  {name: "Intune", path: "microsoft-intunes.png"},
  {name: "Information Protection", path: "microsoft-azure-information-protection.png"},
  {name: "Defender", path: "windows-defender.png"}
];


basicPlan: Plan = {
  name: "Microsoft 365 Business Basic",
  icons: this.icons.slice(0, 4)
};

standardPlan: Plan = {
  name: "Microsoft 365 Business Standard",
  icons: this.icons.slice(0, 10)
};

premiumPlan: Plan = {
  name: "Microsoft 365 Business Premium",
  icons: this.icons
};

ms365Plan: Plan = {
  name: "Microsoft 365 Apps",
  icons: this.icons.slice(3, 10)
};


allPlans: Plan[] = [this.basicPlan, this.standardPlan, this.premiumPlan, this.ms365Plan];

}
