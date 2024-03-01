declare module 'countrycitystatejson' {
  export function getCountries(): Country[];
  export function getStatesByShort(countryShortName: string): State[];
  export function getCities(country: string, state: string): City[];

  interface Country {
    id: number;
    name: string;
    isoCode: string;
  }

  interface State {
    id: number;
    name: string;
    countryShortCode: string;
    countryName: string;
    stateCode: string;
  }

  interface City {
    id: number;
    name: string;
    stateCode: string;
    countryShortCode: string;
  }
}
