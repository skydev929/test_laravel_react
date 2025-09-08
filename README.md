# React + Laravel Project

Run locally in minutes using either SQLite (no database install) or your existing MySQL.

## Project Structure

```
React_Laravel/
├── backend/                 # Laravel API
│   ├── app/                 # Controllers, Models
│   ├── config/              # Laravel config
│   ├── database/            # Migrations, seeders
│   ├── routes/              # API routes
│   └── public/              # Laravel public entry
├── ui/                      # React frontend
│   ├── src/                 # Components, app code
│   └── public/              # Static assets
└── scripts/                 # Helper scripts
    └── run-windows.bat      # One-click Windows starter (SQLite)
    
```

## Quick Start (Windows)

Double‑click `scripts/run-windows.bat`.
- Uses SQLite automatically (no MySQL needed)
- Installs Composer/NPM deps if missing
- Runs migrations + seeders
- Starts API (http://127.0.0.1:8000) and UI (http://127.0.0.1:3000)

## Manual Setup (Cross‑platform)

### Prerequisites
- PHP 8.1+, Composer
- Node.js 18+, npm
- Optional: MySQL (if you don’t want SQLite)

### 1) Get the code
```bash
git clone <repository-url>
cd React_Laravel
```

### 2) Backend (choose one)

Option A — SQLite (simple):
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate

# In .env set:
# DB_CONNECTION=sqlite
# DB_DATABASE=database/database.sqlite

# Create SQLite file
mkdir -p database
type NUL > database/database.sqlite  # Windows cmd
# (macOS/Linux) : touch database/database.sqlite

php artisan migrate --force
php artisan db:seed --force
php artisan serve --host=127.0.0.1 --port=8000
```

Option B — MySQL (use your existing DB):
```sql
-- Connect via your MySQL client, then run:
CREATE DATABASE laravel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- optional user
CREATE USER 'laravel'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON laravel.* TO 'laravel'@'localhost';
FLUSH PRIVILEGES;
```
Set `backend/.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=password
```
Install and run:
```bash
cd backend
composer install
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force
php artisan serve --host=127.0.0.1 --port=8000
```

### 3) Frontend
```bash
cd ui
echo REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api> .env
npm install
npm start
```

### Use the App
- Open http://127.0.0.1:3000
- Create a user (email, full name, select one or more roles)
- After submit you’re redirected to Users list; filter by role

### API (reference)
- POST `/api/users` — body:
  `{ "email": "user@example.com", "full_name": "John Doe", "roles": ["Author"] }`
- GET `/api/users?role=Author` — `role` query is optional

- Error: "Field 'role' doesn't have a default value" — Run a clean migration to remove the legacy `role` column:
  ```bash
  cd backend
  php artisan migrate:fresh --seed
  ```
  Then retry your request.

## Useful Commands

- Run backend tests: `php artisan test`
- Clear Laravel caches: `php artisan optimize:clear`
- Build frontend: `cd ui && npm run build`

## Copyright

This project is created by Wesly
