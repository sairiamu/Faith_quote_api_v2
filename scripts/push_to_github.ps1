Param(
    [string]$RepoName = (Split-Path -Leaf (Get-Location)),
    [string]$Remote = "origin",
    [string]$Branch = "main",
    [ValidateSet("public","private")]
    [string]$Visibility = "public",
    [string]$CommitMessage = "Initial commit",
    [string]$RemoteUrl = ""
)

function Exec($cmd) {
    Write-Host "> $cmd"
    & powershell -NoProfile -Command "$cmd"
}

# Check prerequisites
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed or not in PATH. Install Git and retry."
    exit 1
}

$hasGh = (Get-Command gh -ErrorAction SilentlyContinue) -ne $null

# Initialize repo if needed
if (-not (Test-Path .git)) {
    git init
    git branch -M $Branch
} else {
    Write-Host "Repository already initialized."
}

# Add and commit
git add -A
# Only commit if there are staged changes
$diff = git diff --cached --name-only
if ([string]::IsNullOrWhiteSpace($diff)) {
    Write-Host "No changes to commit."
} else {
    git commit -m "$CommitMessage"
}

# If gh exists, use it to create and push the remote automatically
if ($hasGh) {
    Write-Host "Using GitHub CLI to create repo and push..."
    try {
        gh repo create $RepoName --$Visibility --source=. --remote=$Remote --push --confirm
        Write-Host "Repository created and pushed via gh."
        exit 0
    } catch {
        Write-Warning "gh failed: $_ -- falling back to manual remote setup."
    }
}

# Manual remote path path/URL flow
if (-not $RemoteUrl) {
    # If remote already exists, show and push
    $existing = git remote get-url $Remote 2>$null
    if ($LASTEXITCODE -eq 0 -and -not [string]::IsNullOrWhiteSpace($existing)) {
        Write-Host "Remote '$Remote' already set to: $existing"
        git push -u $Remote $Branch
        exit 0
    }

    Write-Host "No GitHub CLI available. Please provide the remote repository URL (e.g. https://github.com/USERNAME/$RepoName.git) or press Enter to cancel:"
    $RemoteUrl = Read-Host "Remote URL"
    if ([string]::IsNullOrWhiteSpace($RemoteUrl)) {
        Write-Error "No remote URL provided; aborting."
        exit 1
    }
}

# Add remote and push
git remote add $Remote $RemoteUrl
git push -u $Remote $Branch
Write-Host "Pushed to $RemoteUrl on branch $Branch."
