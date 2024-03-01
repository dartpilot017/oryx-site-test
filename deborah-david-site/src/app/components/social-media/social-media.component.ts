import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent {
  @Output() errorMessageEmitter: EventEmitter<string> = new EventEmitter<string>();

  onSocialMediaChange(selectedValue: string): void {
    // Perform validation based on the selected social media value
    if (selectedValue === '') {
      this.emitErrorMessage('Social media shouldn\'t be empty');
    } else {
      // Perform other validation if needed and emit different error messages as required.
      this.emitErrorMessage('');
    }
  }

  private emitErrorMessage(errorMessage: string): void {
    this.errorMessageEmitter.emit(errorMessage);
  }

  username: string = '';
  socialMedia: string = '';
}
