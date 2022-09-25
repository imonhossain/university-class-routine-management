/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable node/no-process-env */
/* eslint-disable unicorn/prefer-module */
require('dotenv').config();
import { Course } from '@/entities/Course';
import { User } from '@/entities/User';
import { ConnectionOptions } from 'typeorm';

const TypeOrmConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [User, Course],
  debug: true,
  synchronize: false,
  migrations: process.env.typeorm === 'true' ? ['migrations/*.ts'] : [],
  cli: {
    migrationsDir: 'migrations',
  },
};

export default TypeOrmConfig;
