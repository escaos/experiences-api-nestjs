import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.TYPEORM_TYPE as any,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default typeOrmConfig;
