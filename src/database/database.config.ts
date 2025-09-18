import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  dialect: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: parseInt(configService.get('DB_PORT', '5432')),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'password'),
  database: configService.get('DB_DATABASE', 'idea_bp_db'),
  autoLoadModels: true,
  synchronize: false, // Use migrations instead of sync
  logging: configService.get('NODE_ENV') === 'development' ? console.log : false,
  dialectOptions: {
    useUTC: false,
    ssl: configService.get('NODE_ENV') === 'production' ? {
      require: true,
      rejectUnauthorized: false,
    } : false,
  },
  timezone: '+00:00',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
});