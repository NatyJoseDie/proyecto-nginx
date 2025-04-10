# Proyecto Web - pasos previos antes de desarrollar aplicacion 

## Tecnologías Instaladas

### Frontend (Parte Visual)
- **Angular**: 
  - Es un framework (conjunto de herramientas) para crear aplicaciones web
  - Permite crear páginas web dinámicas e interactivas
  - Desarrollado por Google
  - Usa TypeScript, una versión mejorada de JavaScript

- **PrimeNG**: 
  - Es una colección de componentes visuales para Angular
  - Proporciona elementos como botones, tablas, menús ya diseñados
  - Ahorra tiempo al no tener que diseñar todo desde cero
  - Tiene una documentación con ejemplos fáciles de seguir

### Backend (Servidor)
- **NestJS**: 
  - Es un framework para crear el servidor de la aplicación
  - Maneja las peticiones que llegan desde el frontend
  - Se conecta con la base de datos
  - Está basado en Node.js y usa TypeScript
  - Tiene una estructura organizada y fácil de mantener

- **TypeORM**: 
  - Es una herramienta para trabajar con bases de datos
  - Permite escribir código TypeScript en lugar de SQL
  - Hace más fácil crear y modificar tablas en la base de datos
  - Maneja las conexiones y consultas a la base de datos

### Base de Datos
- **PostgreSQL**: 
  - Es un sistema de base de datos profesional
  - Almacena toda la información de la aplicación
  - Es gratuito y de código abierto
  - Muy usado en aplicaciones web modernas
  - Tiene herramientas visuales como pgAdmin 4 para administrarlo

### Servidor Web
- **Nginx**: 
  - Es un servidor web que distribuye las peticiones
  - Actúa como punto de entrada a nuestra aplicación
  - Puede manejar muchas conexiones simultáneas
  - Sirve los archivos estáticos (imágenes, CSS, etc.)
  - Mejora la seguridad y el rendimiento

### Gestión de Procesos
- **PM2**: 
  - Es un administrador de procesos para Node.js
  - Mantiene la aplicación funcionando
  - Reinicia automáticamente si hay errores
  - Muestra logs y estadísticas
  - Útil cuando la aplicación está en producción

## Puertos y Configuración
- Frontend (Angular): Puerto 4200
  - Aquí se ve la interfaz de usuario
  - Se accede desde http://localhost:4200

- Backend (NestJS): Puerto 3000
  - Aquí corre el servidor
  - Se accede desde http://localhost:3000

- Base de datos (PostgreSQL): Puerto 5432
  - Donde se conecta la base de datos
  - Se administra con pgAdmin 4

- Nginx: Puerto 80
  - Puerto principal para acceder a la aplicación
  - Direcciona el tráfico al frontend o backend según sea necesario

## Estructura del Proyecto

## Flujo de Trabajo Básico
1. El usuario accede a través del navegador (frontend)
2. Angular maneja la interfaz y envía peticiones al backend
3. NestJS (backend) procesa las peticiones
4. TypeORM se comunica con PostgreSQL
5. La base de datos almacena o devuelve información
6. Nginx coordina todo el tráfico
7. PM2 mantiene el servidor funcionando

## Herramientas de Desarrollo
- Visual Studio Code: Para escribir código
- pgAdmin 4: Para administrar la base de datos
- Terminal/Consola: Para ejecutar comandos
- Navegador web: Para probar la aplicación

