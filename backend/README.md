# User Insights Dashboard - Backend

This is a backend API project built with [Laravel](https://laravel.com/). It provides a robust foundation for modern PHP applications, following best practices and a modular structure.

## Features

- Laravel 10+ framework
- RESTful API structure
- Environment-based configuration
- Database migrations, seeders, and factories
- Authentication scaffolding
- Modular service providers
- CORS, session, and queue configuration
- Ready for deployment

## Requirements

- PHP >= 8.1
- Composer
- MySQL or compatible database
- Node.js & npm (for asset compilation, if needed)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/JohnLloydV/property-insights-dashboard-be.git
cd property-insights-dashboard-be
```

### 2. Install dependencies

```bash
composer install
```

### 3. Copy and configure environment

```bash
cp .env.example .env
# Edit .env to match your local setup (DB, mail, etc.)
```

### 4. Generate application key

```bash
php artisan key:generate
```

### 5. Run database migrations (and seeders if needed)

```bash
php artisan migrate
# Optional: php artisan db:seed
```

### 6. (Optional) Install Node dependencies and build assets

If you use Laravel Mix or Vite for frontend assets:

```bash
npm install
npm run dev
```

### 7. Start the development server

```bash
php artisan serve
```

The API will be available at [http://localhost:8000](http://localhost:8000).

## Project Structure

```
app/
  Http/         # Controllers, Middleware, Requests
  Models/       # Eloquent models
  Providers/    # Service providers
bootstrap/      # Application bootstrap files
config/         # Configuration files
database/
  factories/    # Model factories
  migrations/   # Database migrations
  seeders/      # Database seeders
public/         # Publicly accessible files (index.php, assets)
resources/      # Views, language files, etc.
routes/         # Route definitions (web.php, api.php)
storage/        # Logs, cache, file uploads
tests/          # PHPUnit tests
vendor/         # Composer dependencies
```

## Useful Commands

- Run tests:  
  ```bash
  php artisan test
  ```
- Clear caches:  
  ```bash
  php artisan optimize:clear
  ```
- Run queue worker:  
  ```bash
  php artisan queue:work
  ```

## Deployment

- Configure your `.env` for production.
- Set correct permissions for `storage/` and `bootstrap/cache/`.
- Point your web server's document root to the `public/` directory.

## License

This project is open-sourced software licensed under the [MIT license](LICENSE).

---