FROM node:lts-alpine3.16
WORKDIR /app/
COPY . ./
RUN npm i
RUN apk update && apk add && apk add ffmpeg
CMD [ "npm", "run start" ]
