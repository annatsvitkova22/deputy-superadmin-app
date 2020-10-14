// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    databaseURL: "DATABASE_URL",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId: "APP_ID",
    measurementId: "MEASUREMENT_ID"
  },
  checkTokenPath: 'BASE_FUNCTIONS_URL/checkToken',
  createDeputyPath: 'BASE_FUNCTIONS_URL/createCustomUser',
  changeEmail: 'BASE_FUNCTIONS_URL/updateEmail',
  sendComentDeputyPath: 'BASE_FUNCTIONS_URL/sendCommentDeputy',
  desibleUserPath: 'BASE_FUNCTIONS_URL/disabledUser',
  editUserPath: 'BASE_FUNCTIONS_URL/editUser',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
