import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { City, Country, State } from 'countrycitystatejson';
import { CountryService } from 'src/app/services/country.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}


@Component({
  selector: 'app-organization-location',
  templateUrl: './organization-location.component.html',
  styleUrls: ['./organization-location.component.scss']
})
export class OrganizationLocationComponent {
  @Output() errorMessageEmitter: EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup;
  matcher = new MyErrorStateMatcher();

  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];

  country: FormControl = new FormControl(null, [Validators.required]);

  state = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);

  city = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);

  constructor(private service: CountryService) {
    this.countries = this.service.getCountries();
    this.form = new FormGroup({
      country: this.country,
      state: this.state,
      city: this.city,
    });
  }

  ngOnInit() {
    this.country.valueChanges.subscribe((country) => {
      this.state.reset();
      this.state.disable();
      if (country) {
        this.states = this.service.getStatesByCountry(country);
        this.state.enable();
      }
    });

    this.state.valueChanges.subscribe((state) => {
      this.city.reset();
      this.city.disable();
      if (state) {
        this.cities = this.service.getCitiesByState(this.country.value, state);
        this.city.enable();
      }
    });
  }

  emitErrorMessage() {
    if (this.form.invalid) {
      this.errorMessageEmitter.emit('Organization Location is incomplete');
    }
  }

  // handling form validation
  organizationName = new FormControl('', Validators.required);
}
