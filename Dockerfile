
FROM 912582928760.dkr.ecr.eu-west-1.amazonaws.com/node:latest  As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 
RUN npm i -g typeorm
COPY . .

RUN npm run build
RUN npm run typeorm migration:run

EXPOSE 7010

CMD ["node", "dist/main"] 