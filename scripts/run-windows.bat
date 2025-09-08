@echo off
setlocal ENABLEDELAYEDEXPANSION

REM Root dir is the script's directory's parent
pushd %~dp0\..

echo ==========================================
echo  React + Laravel Starter (No DB setup)
echo  This script will:
echo   - Configure Laravel to use SQLite
echo   - Install Composer and NPM dependencies if needed
echo   - Run migrations and seeders
echo   - Start Laravel API (127.0.0.1:8000) and React UI (127.0.0.1:3000)
echo ==========================================

REM ---------- Backend setup ----------
cd backend

if not exist .env (
  echo Creating backend .env from example...
  copy /Y .env.example .env >nul
)

if not exist database mkdir database
if not exist database\database.sqlite (
  echo Creating SQLite database file...
  type nul > database\database.sqlite
)

REM Configure .env for SQLite
for /f "usebackq tokens=*" %%A in (".env") do (
  set "line=%%A"
  echo !line! | findstr /r "^DB_CONNECTION=" >nul && set "line=DB_CONNECTION=sqlite"
  echo !line! | findstr /r "^DB_DATABASE=" >nul && set "line=DB_DATABASE=%cd%\database\database.sqlite"
  echo !line!>> .env.tmp
)
move /Y .env.tmp .env >nul

REM Composer install if needed
if not exist vendor\autoload.php (
  echo Installing Composer dependencies...
  composer install --no-interaction --prefer-dist
)

echo Generating app key...
php artisan key:generate --force

echo Running migrations and seeders...
php artisan migrate --force
php artisan db:seed --force

REM Start Laravel in new window
start "Laravel API" cmd /c php artisan serve --host=127.0.0.1 --port=8000

REM ---------- Frontend setup ----------
cd ..\ui

if not exist .env (
  echo REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api> .env
)

if not exist node_modules (
  echo Installing NPM dependencies...
  npm install --yes
)

REM Start React in new window
start "React UI" cmd /c npm start

REM Open browser
start "" http://127.0.0.1:3000/

popd
echo Done. Two windows should open for API and UI. You can close this window.
timeout /t 3 >nul
exit /b 0


