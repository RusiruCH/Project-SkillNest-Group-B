@echo off
echo ========================================================
echo   Pushing Module 01 to GitHub: Project-SkillNest-Group-B
echo   Contributor: L.M.R.C.Bandara (SEU/IS/22/ICT/113)
echo ========================================================
echo.

git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCESSFULLY PUSHED TO GITHUB!
    echo   Repository: https://github.com/RusiruCH/Project-SkillNest-Group-B
    echo ========================================================
) else (
    echo.
    echo   If prompted, please complete the GitHub sign-in in your browser window.
)

pause
