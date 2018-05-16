#Run asp.net 4.6 version of msbuild

set-strictmode -version latest
$ErrorActionPreference = "Stop"

#run msbuild

iex "& 'C:\Program Files (x86)\MSBuild\14.0\Bin\MsBuild.exe' /p:DebugSymbols=false /p:DebugType=None /p:VisualStudioVersion=12.0 /p:VSToolsPath=c:\MSBuild.Microsoft.VisualStudio.Web.targets.14.0.0.3\tools\vstoolspath"

if ($LASTEXITCODE -ne 0) {exit 1}