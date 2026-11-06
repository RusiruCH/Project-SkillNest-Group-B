@echo off
set "PATH=C:\Users\Lenovo\AppData\Local\GitHubDesktop\app-3.6.10\resources\app\git\cmd;%PATH%"

echo ========================================================
echo   SkillNest Group B - Module 03: Code Playground
echo   Contributor: B.S.D.P. Wickramasingha (SEU/IS/22/ICT/013)
echo   Repository:  Project-SkillNest-Group-B
echo   Branch:      member03-code-playground
echo ========================================================
echo.

echo Checking Git status...
git status
echo.

echo Pushing member03-code-playground branch to GitHub...
git push origin member03-code-playground

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCESSFULLY PUSHED TO GITHUB!
    echo   Branch: member03-code-playground
    echo   Pull Request: https://github.com/RusiruCH/Project-SkillNest-Group-B/pull/new/member03-code-playground
    echo ========================================================
) else (
    echo.
    echo   If prompted, please complete the GitHub sign-in in your browser window.
)

pause
