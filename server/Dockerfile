FROM node:18.16.0

WORKDIR /PERN-TODO 

COPY ./package.json ./

RUN npm i

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]