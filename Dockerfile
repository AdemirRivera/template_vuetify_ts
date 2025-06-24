FROM node:22.15.1-alpine

RUN npm i -g @vue/cli

WORKDIR /app

COPY package.json ./

RUN npm install \
&& chown -R node:node /app/node_modules

USER node

CMD ["npm", "run", "dev", "--", "--host", "--port=8019"]
