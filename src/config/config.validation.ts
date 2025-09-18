import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  
  // Database
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_DIALECT: Joi.string().valid('mysql', 'postgres', 'sqlite', 'mariadb').default('mysql'),
  
  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().default('24h'),
  
  // API
  API_PREFIX: Joi.string().default('api/v1'),
  API_TITLE: Joi.string().default('Idea BP Backend API'),
  API_DESCRIPTION: Joi.string().default('Backend API for Idea BP Application'),
  API_VERSION: Joi.string().default('1.0.0'),
  
  // CORS
  CORS_ORIGIN: Joi.string().default('*'),
  
  // Rate Limiting
  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(10),
});