## PRODUCTION ONLY

FROM node:13.8.0

ENV DEBIAN_FRONTEND noninteractive
ENV PORT 80

ARG ENVIRONMENT

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
RUN yarn install

COPY --chown=www-data:www-data . /usr/src/app
RUN yarn run "build:$ENVIRONMENT"
RUN yarn run version

CMD [ "npm", "run", "serve" ]
