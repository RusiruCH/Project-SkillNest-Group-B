@echo off
echo ========================================================
echo   SkillNest Module 01 Git Commit & Push Helper
echo   Contributor: L.M.R.C.Bandara (SEU/IS/22/ICT/113)
echo ========================================================

git init
git config user.name "L.M.R.C.Bandara"
git config user.email "SEU-IS-22-ICT-113@seu.ac.lk"

git add .
git commit -m "feat(module1): Implement Course and Learning Material Management by L.M.R.C.Bandara (SEU/IS/22/ICT/113)"

git branch -M main

IF "%~1"=="" (
    echo.
    echo All files committed locally!
    echo To push to GitHub, run:
    echo   git remote add origin ^<YOUR_GITHUB_REPO_URL^>
    echo   git push -u origin main
) ELSE (
    git remote remove origin 2>nul
    git remote add origin %1
    echo Pushing to %1 ...
    git push -u origin main
)

echo Done!
pause

