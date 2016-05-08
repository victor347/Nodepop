# Nodepop - Victor Ortegon
-------

  API de venta de articulos de segunda mano.

- Registro de usuarios
- Registro de pushTokens
- Consulta de anuncios con filtros
- Autenticación JWT
- Mensajes de error internacionalizados con i18n-2

## Instalación
-------

### Requerimientos

Instalar las siguientes herramientas:

- [node 6.x](http://nodejs.org)
- [mongoDB](https://www.mongodb.com/download-center?jmp=nav#community)

### Modulos
Para instalar todos los modulos necesarios para iniciar el servidor se debe ejecutar el comando:
```bash
>npm install
```
### Variables de entorno
#### Windows
Antes de iniciarla aplicación se deben agregar al sistema las siguientes variables de entorno.

- NODE_PATH=lib
- DEBUG=Nodepop:*

#### Mac
No se debe realizar configuración adicional ya que en el comando de incio se asignan las variables de entorno.


### Iniciar base de datos MongoDB

Al ejecutar el comando se iniciara la base de datos Mongo en el puerto 27017 y guardara la BD en el directorio mongo-db
#### Windows
```bash
>npm run mongo-win
```
#### Mac
```bash
> npm run mongo-mac
```
### Inicializar base de datos
Al ejecutar el comando se agregan a las colecciones de anuncios y usuarios los datos que se encuentran en el archivo /database/initDB.js
#### Windows
```bash
>npm run initDB
```
Ahora ya se tienen usuarios y anuncios en la base de datos.

Los usuarios pueden ser usados despues para autenticarse y poder consultar los anuncios:

name | email | key
-----|-------|-----
Victor Ortegon | victor@Nodepop.com | pass23
Carlos Mafla | carlos@Nodepop.com | pass23
Migel Sierra | miguel@node.com | pass23
Diana Suarez | diana@mongo.com | pass23
Daniela Rico | daniela@node.com | pass23

### Iniciar Nodepop

Para iniciar el servidor Nodepop se debe ejecutar le siguiente comando:
#### Windows
```bash
>npm start
```
#### Mac
```bash
>npm run start-mac
```

## Uso de Nodepop
-------

## Lenguajes
Los mensajes de erorr del API estan internacionalizados soportando ingles y español.

Se debe enviar el parametro **"lang=es"** o **"lang=en"** en la query string para definir el lenguaje en el que se responderan los mensajes de error. El lenguaje por defecto es ingles.