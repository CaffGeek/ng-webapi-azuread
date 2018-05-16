# Stage 1 - build app
FROM microsoft/dotnet-framework-build:4.7.1 as builder

# Install Chocolatey (tools to automate commandline compiling)
# ENV chocolateyUseWindowsCompression false
# RUN @powershell -NoProfile -ExecutionPolicy unrestricted -Command "(iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))) >$null 2>&1" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

# # Install build tools
# RUN powershell add-windowsfeature web-asp-net45 \
# && choco install microsoft-build-tools -y --allow-empty-checksums -version 14.0.23107.10 \
# && choco install dotnet4.6-targetpack --allow-empty-checksums -y \
# && choco install nuget.commandline --allow-empty-checksums -y \
# && nuget install MSBuild.Microsoft.VisualStudio.Web.targets -Version 14.0.0.3 \
# && nuget install WebConfigTransformRunner -Version 1.0.0.1

RUN md c:\build
WORKDIR c:/build
COPY . c:/build

RUN nuget restore
RUN msbuild.exe /t:Build /p:Configuration=Release /p:OutputPath=out /p:VSToolsPath=c:\MSBuild.Microsoft.VisualStudio.Web.targets.14.0.0.3\tools\VSToolsPath webapi.sln
#RUN powershell ./Run-MsBuild.ps1
#RUN ["C:\\Program Files (x86)\\MSBuild\\14.0\\Bin\\msbuild.exe", "/p:VSToolsPath=c:\MSBuild.Microsoft.VisualStudio.Web.targets.14.0.0.3\tools\VSToolsPath webapi.sln"]
#RUN ["C:\\Program Files (x86)\\MSBuild\\14.0\\Bin\\msbuild.exe", "webapi.proj", "/p:VSToolsPath=C:\MSBuild.Microsoft.VisualStudio.Web.targets.14.0.0.3\tools\VSToolsPath"]

# Stage 2 - deploy app
# FROM microsoft/iis as webui

# RUN powershell -NoProfile -Command Remove-Item -Recurse C:\inetpub\wwwroot\*

# WORKDIR c:\\inetpub\\wwwroot

# COPY --from=builder c:\\build\\webapi .

# SHELL ["powershell", "-Command"]
# ENTRYPOINT C:\ServiceMonitor.exe w3svc 
