param (
    [string]$RemoteUrl
)

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  SkillNest Module 01 Git Commit & Push Helper" -ForegroundColor Yellow
Write-Host "  Contributor: L.M.R.C.Bandara (SEU/IS/22/ICT/113)" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan

git init
git config user.name "L.M.R.C.Bandara"
git config user.email "SEU-IS-22-ICT-113@seu.ac.lk"

git add .
git commit -m "feat(module1): Implement Course and Learning Material Management by L.M.R.C.Bandara (SEU/IS/22/ICT/113)"
git branch -M main

if ($RemoteUrl) {
    git remote remove origin 2>$null
    git remote add origin $RemoteUrl
    Write-Host "Pushing to $RemoteUrl..." -ForegroundColor Green
    git push -u origin main
} else {
    Write-Host ""
    Write-Host "Changes successfully committed to local git repository!" -ForegroundColor Green
    Write-Host "To push to your remote GitHub repository, execute:" -ForegroundColor Yellow
    Write-Host "  git remote add origin <YOUR_GITHUB_REPO_URL>" -ForegroundColor White
    Write-Host "  git push -u origin main" -ForegroundColor White
}

