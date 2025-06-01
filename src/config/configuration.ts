export default () => ({
  port: parseInt(process.env.PORT || '3000'),
  prefix: process.env.GLOBAL_PREFIX || 'api',
  swaggerHabilitado: process.env.SWAGGER_HABILITADO === 'true',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'root',
    name: process.env.DB_NAME || 'encuesta_web',
    
  },
});
