module.exports = {
  apps: [
    {
      name: 'encuestas',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
        CORS_ORIGIN: 'localhost',
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_USER: 'postgres',
        DB_PASSWORD: 'admin',
        DB_NAME: 'encuesta_web',
        DB_LOGGING: 'false',
        GLOBAL_PREFIX: 'api',
        SWAGGER_HABILITADO: false,
      },
      time: true,
    },
  ],
};

////instalar pm2
//npm install pm2 -g

//// arranca la app
//pm2 start .\ecosystem.config.js

////Guardar configuración(Si se apaga la compu sino se pierde)
// pm2 save

////información sobre el proceso que esta corriendo
//pm2 status

////
// pm2 logs

////
// pm2 monit

////compilar y pm2 arranca el proceso con el archivo que fue configurado
//npm run deploy
