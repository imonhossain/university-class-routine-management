# Class routine backend service

Service for handling Course, Teacher, Room, TimeSlot And booking.

Before start please give some time to these reading material

- [NestJS](https://nestjs.com/)
- [TypeORM migration](https://typeorm.io/#/migrations)

###### Prerequisites

- Install Node 25 LTS

- Install [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/)

### Database

- mysql 5.7

### Developer instructions

- Install NestJS globally with `npm i -g @nestjs/cli`.
- Clone repo and run command `npm i`
- Install typeorm globally with `npm i -g typeorm`. You can also chose to use `npx typeorm <params>` for each command if you prefer not having to install it.
- Run command `npm run create:env` to copy .env.sample to .env
- Docker compose run `docker-compose up -d`
- After latest pull schema migration required
  `npm run build`
  `npm run typeorm migration:run`
- Preferred commands for developers
  `npm run start:dev`
- When developer add a new entity and fields then developer have to follow the migration process
  `npm run typeorm migration:generate -- -n <name of changes>`
  `npm run build`
  `npm run typeorm migration:run`
  it'll generate new table and alter column changes
- Developer must need to build his code before push.
  `npm run build`

###### Run the tests ########

- `npm run test`

###### Start the development environment

- `npm run start:dev`

###### Bird's eye view of the existing APIs using the SwaggerUI

- Browse <http://localhost:7010/rest/api-service/swagger/>


## Access

| Email | Password | Role |
| ------ | ------ | ------ |
| admin@gmail.com | admin | ADMIN |


## Change Log

- `0.0.1`: Project scaffolding.
