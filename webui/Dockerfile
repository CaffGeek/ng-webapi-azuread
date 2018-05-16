# Stage 1 - build angular app

FROM stefanscherer/node-windows as builder

COPY package.json ./

### Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i 
RUN mkdir ng-app 
RUN move node_modules ng-app

WORKDIR c:\\ng-app

COPY . .

RUN npm run ng build --env=dev

# Stage 2 - deploy angular app

FROM microsoft/iis as webui

RUN powershell -NoProfile -Command Remove-Item -Recurse C:\inetpub\wwwroot\*

WORKDIR c:\\inetpub\\wwwroot

COPY --from=builder c:\\ng-app\\dist .

SHELL ["powershell", "-Command"]
ENTRYPOINT C:\ServiceMonitor.exe w3svc 
