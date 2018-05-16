# Ng WebAPI AzureAD

This is meant to be a simple starting point to spin up an Angular app, with a .Net WebAPI backend, connecting to a SQL Server and using Azure AD for authentication

## Setup AzureAD for your app

Follow the steps here to setup AzureAD for your app (https://docs.microsoft.com/en-us/azure/app-service/app-service-mobile-how-to-configure-active-directory-authentication)

You'll need to create an ADMIN and USER role and assign them to a user

- Modify the webui/src/environments with your azure tenant and webApiClientId

- Modify the webapi/web.config with your azure tenant and webApiClientId

## build and run

docker-compose build && docker-compose up

## view it

webui: http://127.0.0.1:8080
webapi: http://127.0.0.1:8081

## Todo

The webui seems to be working fine, the webapi is not working correctly, and the sql image isn't being referenced at all currently. Lots more to do