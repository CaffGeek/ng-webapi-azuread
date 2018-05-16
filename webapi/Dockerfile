# Stage 1 - build app
FROM microsoft/dotnet-framework-build:4.7.1 as builder

RUN md c:\build
WORKDIR c:/build
COPY . c:/build

RUN nuget restore

RUN nuget install MSBuild.Microsoft.VisualStudio.Web.targets -Version 14.0.0.3
RUN msbuild.exe webapi/webapi.csproj /t:Build /p:Configuration=Release /p:OutputPath=out /p:VSToolsPath=c:\MSBuild.Microsoft.VisualStudio.Web.targets.14.0.0.3\tools\VSToolsPath

# Stage 2 - deploy app
FROM microsoft/aspnet as webui

WORKDIR c:\\inetpub\\wwwroot

COPY --from=builder c:\\build\\webapi\\out .