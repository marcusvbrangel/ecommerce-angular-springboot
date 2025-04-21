FROM node:hydrogen-alpine3.20 AS build
WORKDIR /app
COPY package*.json .
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build --prod

FROM nginx:1.25.2-alpine
COPY --from=build /app/dist/angular-ecommerce/ /usr/share/nginx/html
COPY ./conf/nginx/default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
