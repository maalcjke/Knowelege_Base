FROM node:latest
WORKDIR /app
ADD package*.json .
RUN npm install
ADD . .
RUN npx prisma generate
RUN npm run build
RUN npm prune --production

CMD ["npm", "run", "start:migrate:prod"]