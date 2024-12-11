## **Стек: Express.js, TypeScript, Prisma, PostgreSQL, Docker**

### 🐳 Готовый образ Knowledge Base + PostgreSQL  

Для быстрой настройки можно использовать готовый Docker-образ:  
```bash
docker pull ghcr.io/maalcjke/knowelege_base/knowelegebase:latest
```

### 📋 Что необходимо для установки  

Перед началом работы убедитесь, что на вашем компьютере установлены следующие инструменты:
| **[➡️ Скачать Git](https://git-scm.com/downloads)** | **[➡️ Скачать Docker](https://www.docker.com/products/docker-desktop)** |
|----------------------------------------------------|------------------------------------------------------------------------|

---

### 🛠️ Как запустить  

1. **Клонируйте репозиторий**  
   ```bash
   git clone https://github.com/maalcjke/Knowelege_Base.git
   cd Knowelege_Base
   ```

2. **Создайте файл `.env`**  
   В корне проекта настройте файл [`.example.env`](https://github.com/maalcjke/Knowelege_Base/blob/master/.example.env), либо создайте новый файл `.env` и добавьте следующие переменные:  
   ```dotenv
   # Database settings
   POSTGRES_HOST=postgres
   POSTGRES_USER=postgres
   POSTGRES_DB=knowledge
   POSTGRESS_PASSWORD=postgres
   POSTGRESS_PORT=5432
   
   DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRESS_PASSWORD}@${POSTGRES_HOST}:${POSTGRESS_PORT}/${POSTGRES_DB}?schema=public"
   
   # Security settings
   JWT_SECRET=ENV_SECRET
   JWT_EXPIRES_IN=1d
   
   # Web server settings
   PORT=3000
   ```

3. **Соберите и запустите контейнеры**  
   Выполните команду:  
   ```bash
   docker-compose up -d
   ```

4. **Откройте приложение в браузере**  
   После успешного запуска приложение будет доступно по адресу:  
   [http://localhost:3000/api](http://localhost:3000/api)

### Endpoint'ы (без swagger)
## Articles
- GET: [http://localhost:3000/api/articles/](http://localhost:3000/api/articles/)<br />
  return: All articles (в зависмости от авторизации)
- GET: [http://localhost:3000/api/articles/:id](http://localhost:3000/api/articles/1)<br />
  return: One article (в зависмости от авторизации)
- POST: [http://localhost:3000/api/articles/](http://localhost:3000/api/articles/)<br />
  return: Create article (только авторизрованным)
- PUT: [http://localhost:3000/api/articles/:id](http://localhost:3000/api/articles/1)<br />
  return: Update article (только авторизрованным)
- DELETE: [http://localhost:3000/api/articles/](http://localhost:3000/api/articles/)<br />
  return: Delete article (только авторизрованным)
## Users
- POST: [http://localhost:3000/api/users/](http://localhost:3000/api/users/)<br />
  return: Create user (без авторизации)
- POST: [http://localhost:3000/api/users/login](http://localhost:3000/api/users/login)<br />
  return: Login in user account (без авторизации)
- DELETE: [http://localhost:3000/api/users/:id](http://localhost:3000/api/users/1)<br />
  return: Delete user account (только авторизрованным)

