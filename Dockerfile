# Stage 1

FROM stefanscherer/node-windows as builder

COPY webui/package.json ./

### Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i 
RUN mkdir ng-app 
RUN move node_modules ng-app

WORKDIR c:\\ng-app

COPY ./webui .

RUN npm run build

# Stage 2

FROM microsoft/iis

RUN powershell -NoProfile -Command Remove-Item -Recurse C:\inetpub\wwwroot\*

WORKDIR c:\\inetpub\\wwwroot

COPY --from=builder c:\\ng-app\\dist .

SHELL ["powershell", "-Command"]
ENTRYPOINT C:\ServiceMonitor.exe w3svc 
