powershell .\dockerSwitchDaemon.ps1 windows

docker build -t ng-webapi-azuread -f Dockerfile .

docker run --rm -d --name webui ng-webapi-azuread

FOR /F "tokens=* USEBACKQ" %%F IN (`docker inspect -f "{{ .NetworkSettings.Networks.nat.IPAddress }}" webui`) DO (
SET ipaddress=%%F
)

start chrome %ipaddress%