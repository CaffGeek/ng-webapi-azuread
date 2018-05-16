docker-compose build && docker-compose up

REM docker exec -it ng-webapi-azuread_webapi_1 cmd
REM docker exec -it ng-webapi-azuread_webui_1 cmd









REM powershell .\dockerSwitchDaemon.ps1 windows

REM rem should also be deleted automatically due to the `docker run --rm` below
REM docker kill webui
REM docker build -t ng-webapi-azuread -f Dockerfile.webui .

REM rem docker run --rm -it --name webui ng-webapi-azuread cmd
REM docker run --rm -d --name webui ng-webapi-azuread

REM rem docker inspect -f "{{ .NetworkSettings.Networks.nat.IPAddress }}" webui
REM FOR /F "tokens=* USEBACKQ" %%F IN (`docker inspect -f "{{ .NetworkSettings.Networks.nat.IPAddress }}" webui`) DO (
REM SET ipaddress=%%F
REM )

REM start chrome %ipaddress%