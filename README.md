# Backend CSM Ads

Бэкенд-сервер на Node.js с TypeScript и Fastify.

## Технологии

- Node.js 22
- TypeScript
- Fastify
- PostgreSQL
- Prisma ORM
- Docker
- Winston (логирование)

## Требования

- Node.js 22
- Docker и Docker Compose
- PostgreSQL (или через Docker)

## Установка

1. Клонируйте репозиторий
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Создайте файл .env на основе .env.example:
   ```bash
   cp .env.example .env
   ```
4. Сгенерируйте Prisma Client:
   ```bash
   npm run prisma:generate
   ```

## Запуск

### Разработка

```bash
# Запуск сервера в режиме разработки
npm run dev
```

### Продакшн

```bash
# Сборка
npm run build

# Запуск
npm start
```

### Docker

```bash
# Сборка и запуск контейнеров
docker-compose up -d

# Остановка
docker-compose down
```

## API Документация

<!-- TODO - вернуть когда реализуем документацию
После запуска сервера документация Swagger доступна по адресу:
http://localhost:3000/documentation -->

## Основные эндпоинты

- `GET /api/v1/health` - проверка работоспособности
- `POST /api/v1/auth/register` - регистрация
- `POST /api/v1/auth/login` - вход
- `POST /api/v1/auth/refresh` - обновление токена
- `GET /api/v1/user/me` - данные текущего пользователя
- `GET /api/v1/progress/:taskId` - прогресс выполнения задачи

## Логирование
<!-- TODO - Доописать после того как удалил winston -->
