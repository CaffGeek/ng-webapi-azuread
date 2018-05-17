# Stage 1 - build app
FROM microsoft/aspnet as builder

SHELL ["powershell"]

ADD https://aka.ms/vs/15/release/vs_buildtools.exe C:\\Downloads\\vs_buildtools.exe
ADD https://dist.nuget.org/win-x86-commandline/v4.3.0/nuget.exe C:\\Nuget\\nuget.exe

RUN C:\\Downloads\\vs_buildtools.exe --add Microsoft.VisualStudio.Workload.MSBuildTools --add Microsoft.VisualStudio.Workload.WebBuildTools --quiet --wait
RUN "[Environment]::SetEnvironmentVariable('Path', $env:Path + ';C:\Nuget;C:\Program Files (x86)\Microsoft Visual Studio\2017\BuildTools\MSBuild\15.0\Bin', [EnvironmentVariableTarget]::Machine)"

RUN md c:\build
WORKDIR c:/build
COPY . c:/build

RUN nuget restore

RUN MSBuild.exe webapi.sln /p:Configuration=Release /p:PublishProfile=FolderProfile /p:DeployOnBuild=true

# Stage 2 - deploy app
FROM microsoft/aspnet as webapi

WORKDIR c:\\inetpub\\wwwroot

COPY --from=builder c:\\build\\webapi\\bin\\publish\\release .