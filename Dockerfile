FROM node as env

#  Fetch Dependencies
# -----------------------------
RUN npm config set unsafe-perm true
RUN npm i -g @angular/cli npm-snapshot
RUN npm cache clean --force


#  Build step
# -----------------------------
FROM env as dev
COPY . src
WORKDIR src
RUN npm i --production
RUN npm rebuild node-sass
RUN ng build

#  Release Stage
# -----------------------------
FROM nginx:latest AS release
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=dev src/dist/turing-frontend/ /usr/share/nginx/html/
CMD sed -i -e 's/_PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
