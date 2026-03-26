@echo off
REM ============================================================
REM  Production Floor Records - Build Script
REM  Run this ONCE on any Windows machine that has Python 3.x
REM  installed.  The finished .exe will be in the dist\ folder.
REM  The .exe is completely standalone - no Python needed on
REM  the target machine, no internet, no GitHub.
REM ============================================================

echo.
echo ============================================================
echo  Production Floor Records - Build
echo ============================================================
echo.

REM Check Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found.
    echo Download from https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during install.
    pause
    exit /b 1
)

echo [1/3] Installing PyInstaller...
pip install pyinstaller --quiet
if errorlevel 1 (
    echo ERROR: Failed to install PyInstaller.
    pause
    exit /b 1
)

echo [2/3] Building .exe ...
pyinstaller ^
    --onefile ^
    --windowed ^
    --name "ProductionFloorRecords" ^
    --clean ^
    main.py

if errorlevel 1 (
    echo.
    echo ERROR: Build failed. See output above.
    pause
    exit /b 1
)

echo.
echo [3/3] Done!
echo ============================================================
echo  Your application is ready:
echo    dist\ProductionFloorRecords.exe
echo.
echo  Copy ProductionFloorRecords.exe to any folder you like.
echo  The database file (production_records.db) will be created
echo  automatically in the SAME folder as the .exe the first
echo  time you run it.
echo.
echo  To move the app later, move BOTH files together:
echo    ProductionFloorRecords.exe
echo    production_records.db
echo ============================================================
echo.
pause
