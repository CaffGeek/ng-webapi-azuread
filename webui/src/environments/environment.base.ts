// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  envName: 'base', 
  apiEndpoint: 'http://localhost:54821', 
  tenant: 'gibblegmail.onmicrosoft.com',
  postLogoutRedirect: '',
  webApiClientId: '11238d1e-b477-4c6c-9e21-5acd3e7b6ece', //ApplicationID in azure
};