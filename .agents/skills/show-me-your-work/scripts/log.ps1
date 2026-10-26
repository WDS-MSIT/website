param(
    [Parameter(Mandatory = $true)][string]$LogFile,
    [Parameter(Mandatory = $true)][string]$Phase,
    [Parameter(Mandatory = $true)][string]$Decision,
    [Parameter(Mandatory = $true)][string]$Why,
    [Parameter(Mandatory = $true)][string]$Evidence,
    [Parameter(Mandatory = $true)][string]$Result
)

$encoding = [System.Text.UTF8Encoding]::new($false)
$fullPath = [System.IO.Path]::GetFullPath($LogFile)
$directory = [System.IO.Path]::GetDirectoryName($fullPath)

if ($directory -and -not [System.IO.Directory]::Exists($directory)) {
    [System.IO.Directory]::CreateDirectory($directory) | Out-Null
}

function ConvertTo-MarkdownTableCell([string]$Value) {
    $clean = $Value -replace "[`t`r`n]", " "
    return $clean.Replace('\', '\\').Replace('|', '\|')
}

if (-not [System.IO.File]::Exists($fullPath) -or (Get-Item -LiteralPath $fullPath).Length -eq 0) {
    $header = "# Decision log`n`n| Time (UTC) | Phase | Decision | Why | Evidence | Result |`n| --- | --- | --- | --- | --- | --- |`n"
    [System.IO.File]::AppendAllText($fullPath, $header, $encoding)
}

$cells = @(
    [DateTime]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ssZ'),
    (ConvertTo-MarkdownTableCell $Phase),
    (ConvertTo-MarkdownTableCell $Decision),
    (ConvertTo-MarkdownTableCell $Why),
    (ConvertTo-MarkdownTableCell $Evidence),
    (ConvertTo-MarkdownTableCell $Result)
)

[System.IO.File]::AppendAllText($fullPath, ("| " + ($cells -join " | ") + " |`n"), $encoding)
