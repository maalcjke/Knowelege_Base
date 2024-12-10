FROM node:latest
WORKDIR /app
ADD package*.json .
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
RUN npx prisma generate

CMD ["npm", "run", "start:migrate:prod"]