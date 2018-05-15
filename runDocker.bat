powershell .\dockerSwitchDaemon.ps1 windows

rem should also be deleted automatically due to the `docker run --rm` below
docker kill webui

docker build -t ng-webapi-azuread -f Dockerfile .

rem docker run --rm -it --name webui ng-webapi-azuread cmd
docker run --rm -d --name webui ng-webapi-azuread

FOR /F "tokens=* USEBACKQ" %%F IN (`docker inspect -f "{{ .NetworkSettings.Networks.nat.IPAddress }}" webui`) DO (
SET ipaddress=%%F
)

start chrome %ipaddress%