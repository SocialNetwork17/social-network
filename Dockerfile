#Устанавливаем зависимости
FROM node:20.11-alpine as dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

#Билдим приложение
#Кэширование зависимостей — если файлы в проекте изменились,
#но package.json остался неизменным, то стейдж с установкой зависимостей повторно не выполняется, что экономит время.
FROM node:20.11-alpine as builder
WORKDIR /app

ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG NEXT_PUBLIC_BASE_DOMAIN

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_BASE_DOMAIN=$NEXT_PUBLIC_BASE_DOMAIN

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build:production

#Стейдж запуска
FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/ ./
EXPOSE 3000
CMD ["npm", "start"]
