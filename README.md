# Knowledge base

**Стек: Express.js (Typescript, Prisma), PostgreSQL, Docker**

--------

**Готовый образ Knowledge + PostgreSQL**  
   ```dotenv
   docker pull ghcr.io/maalcjke/knowelege_base/knowelegebase:latest
   ```

## 🛠️ Как запустить  

1. **Клонируйте репозиторий**  
   ```bash  
   git clone https://github.com/maalcjke/Knowelege_Base.git
   cd Knowelege_Base
   ```  

2. **Создайте `.env` файл**  
   В корне проекта [настройте .example.env](https://github.com/maalcjke/Knowelege_Base/blob/master/.example.env), либо создайте файл `.env` и добавьте следующие переменные:
   ```dotenv  
    #Database settings
    POSTGRES_HOST=postgres
    POSTGRES_USER=postgres
    POSTGRES_DB=knowledge
    POSTGRESS_PASSWORD=postgres
    POSTGRESS_PORT=5432
    
    DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRESS_PASSWORD}@${POSTGRES_HOST}:${POSTGRESS_PORT}/${POSTGRES_DB}?schema=public"
    
    #Security settings
    JWT_SECRET=ENV_SECRET
    JWT_EXPIRES_IN=1d
    
    #Web server settings
    PORT=3000
   ```  

4. **Соберите и запустите контейнеры**  
   Выполните следующую команду:  
   ```bash  
   docker-compose up -d
   ```  

5. **Откройте приложение в браузере**  
   После успешного запуска приложение будет доступно по адресу:  
   [http://localhost:3000](http://localhost:3000) 
   

## 🗂️ Endpoint'ы приложения  

- 
