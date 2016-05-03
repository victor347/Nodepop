# Nodepop

1.-Configurar variables de entorno----------------------------------------------------

Windows-------------------------------------------------------------------------------
Windows no soporta asignar las variables de entorno en la misma instrucción que se inicia la aplicación por lo que 
Antes de iniciarla aplicación se debe agregar a las variables de entorno del sistema las siguientes.

NODE_PATH=lib
DEBUG=Nodepop.*

Linux-Mac-----------------------------------------------------------------------------
Antes de iniciar la aplicación se debe realizar la siguiente configuración.

En el archivo package.json cambiar la linea "start": "nodemon ./bin/www" por "DEBUG=Nodepop.* NODE_PATH=lib nodemon ./bin/www"



2.-Iniciar Base de datos Mongo--------------------------------------------------------

Al ejecutar el comando se iniciara la base de datos Mongo en el puerto 27017 y guardara la BD en el directorio mongo-db

Windows-------------------------------------------------------------------------------
npm run mongo-win

Linux-Mac-----------------------------------------------------------------------------
npm run mongo-mac



3.-Cargar inicial de BD---------------------------------------------------------------
Al ejecutar el comando se agregan datos en las colecciones de anuncios y usuarios.

Windows-------------------------------------------------------------------------------
npm run initDB