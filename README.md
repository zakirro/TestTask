# Установите зависимости: npm i 

# Настройте .env файл в корне проекта

# Запуск сервера 
npm run start:dev

# Приложение будет доступно по адресу:
http://localhost:8000

# Эндпоинты для Auth:

POST	/auth/register - Регистрация
POST	/auth/login	- Логин
POST	/auth/logout	- Выход
POST	/auth/refresh	- Обновление токенов

# Эндпоинты для Users:

POST /users - Создать пользователя
GET /users/:id - Список пользователей по ID
GET /users/ - Получить список всех пользователей 
PATCH / users /:id - Редактировать пользователя
DELETE / users /:id - Удалить пользователя

# Эндпоинты для Tasks:

POST /tasks - Создать задачу 
GET / tasks/:id - Список задач по ID
GET / tasks/ - Получить список всех задач 
PATCH / tasks/:id - Редактировать задачу 
DELETE / tasks/:id - Удалить задачу 

# Эндпоинты для Comments: 

POST /comments - Создать комментарий
GET /comments?task_id=xxx - Список комментариев к задаче 
GET /comments/:id - Получить комментарий по ID
PATCH /comments/:id - Редактировать комментарий
DELETE /comments/:id - Удалить комментарий
