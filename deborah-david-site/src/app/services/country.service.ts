import { Injectable } from '@angular/core';
import * as countrycitystatejson from 'countrycitystatejson';

// const countrycitystatejson = require('countrycitystatejson');
@Injectable({
  providedIn: 'root'
})

export class CountryService {
  

  private countryData = countrycitystatejson;

  getCountries() {
    return this.countryData.getCountries();
  }

  getStatesByCountry(countryShortName: string) {
    return this.countryData.getStatesByShort(countryShortName);
  }

  getCitiesByState(country: string, state: string) {
    return this.countryData.getCities(country, state);
  }
}
