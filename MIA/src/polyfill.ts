// polyfills.ts

// import 'core-js' features and make sure you have added the types you need in your `tsconfig.app.json`
import 'core-js/es';
import 'core-js/proposals/reflect-metadata';

// import the custom elements polyfill
import '@webcomponents/custom-elements/src/native-shim';
import '@webcomponents/custom-elements/custom-elements.min';

// other polyfills as needed
// import 'zone.js/dist/zone';  // Included by default in Angular CLI projects
