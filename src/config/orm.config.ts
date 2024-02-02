import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  port: 3306,
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [`${__dirname}/./entities/**.entity.{ts,js}`],
  synchronize: false, // 스키마 생성
  autoLoadEntities: true,
  charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
  timezone: 'local',
};
