FROM node:14
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN yarn --registry=https://registry.npm.taobao.org
COPY --chown=node:node . .
RUN npm run build
FROM nginx
RUN mkdir /app

COPY --from=0 /home/node/app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
