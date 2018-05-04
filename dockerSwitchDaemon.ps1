param ([Parameter(Mandatory=$true)][ValidateSet("windows","linux")] [string]$targetDaemon)
    $daemon = "*"+$targetDaemon.ToLower()+"*";

    #We want the server portion of the OS/Arch string
    $dockerver = Docker version | Select -Last 2
    
    #$dockerver = Docker version
    if ($dockerver -like $daemon)
    {
        echo "Daemon already set to:"$targetDaemon    
    }
    else
    {
        echo "Switching daemon...";
        & "c:\program files\docker\docker\dockercli" -SwitchDaemon
        echo "Daemon switched!"
    }