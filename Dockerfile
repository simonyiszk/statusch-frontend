FROM node:14
WORKDIR /app
COPY package.json yarn.lock .
RUN yarn install --pure-lockfile
COPY . .
RUN yarn build
RUN yarn global add serve
CMD [ "serve", "-s", "build" ]

