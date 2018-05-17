# Stage 1 - build app
FROM microsoft/dotnet-framework:4.7.2-sdk as builder

RUN md c:\build
WORKDIR c:/build
COPY . c:/build

RUN nuget restore

RUN nuget install MSBuild.Microsoft.VisualStudio.Web.targets -Version 14.0.0.3
RUN nuget install MSBuildTasks -Version 1.5.0.235

# TODO: this still isn't outputing how it should be
RUN msbuild.exe webapi/webapi.csproj \
    /p:VSToolsPath=c:\build\MSBuild.Microsoft.VisualStudio.Web.targets.14.0.0.3\tools\VSToolsPath \
    /p:Configuration=Release \
    /p:DeployOnBuild=true \
    /p:PublishProfile=FolderProfile

# Stage 2 - deploy app
FROM microsoft/aspnet as webui

WORKDIR c:\\inetpub\\wwwroot

# TODO: This really isn't where we want it to copy from...but the msbuild publish isn't working properly
COPY --from=builder c:\\build\\webapi\\obj\\Release\\Package\\PackageTmp .