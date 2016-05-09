# Nodepop - Victor Ortegon
-------

  API de venta de articulos de segunda mano.

- Registro de usuarios
- Almacenado de password con crypto.pbkdf2
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

### Lenguajes
Los mensajes de erorr del API estan internacionalizados soportando ingles y español.

Se debe enviar el parametro **"lang=es"** o **"lang=en"** en la query string para definir el lenguaje en el que se responderan los mensajes de error. El lenguaje por defecto es ingles.

`https://host:443/api/v1/users/authenticate?lang=en`
```js
{
  "succes": false,
  "message": "Authentication failed. Invalid Email/Password combination.",
  "error": {
    "status": 401
  }
}
```
`https://host:443/api/v1/users/authenticate?lang=es`
```js
{
  "succes": false,
  "message": "Autenticación Fallida. Combinación invalida de Email/Password.",
  "error": {
    "status": 401
  }
}
```

### API - Usuarios
-------
#### Registrar usuarios

Para registrar un usuario se deben pasar los siguientes datos del modelo en el body de una petición POST a la siguiente URL:

`https://host:443/api/v1/users`

Modelo de usuario:

```js
{
    name: {
        type: String,
        required: true,
    },
    email: {  // Debe ser una dirección de email valida.
        type: String,
        required: true,
        unique : true // Un email se puede registrar una sola vez.
    },
    pass: {
        type: String,
        required: true
    }
}
```

Si los datos son correctos se obtendra un mensaje de respuesta exitoso como el siguiente:

```js
{
  "success": true,
  "user": {
    "name": "Victor Ortegon",
    "email": "victor@nodepop.com"
  }
}
```

En caso de que los datos no sean correctos se obtendra un http 422 con un mensaje como el siguiente:

```js
{
  "succes": false,
  "message": "Datos de usuario incorrectos.",
  "error": {
    "status": 422
  }
}
```

#### Autenticar usuario

Para autenticar un usuario se deben pasar los campos `email` and `pass` en el body de una petición POST a la siguiente URL::

`https://host:443/api/v1/users/authenticate`

Si la autenticación fue exitosa se obtendra un mensaje exitoso con el token:

```js
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3MmY4Y2I0N2E5NzRkODQwO"
}
```

Si la autenticación no fue exitosa se obtendra un mensaje con el error:

```js
{
  "succes": false,
  "message": "Autenticación Fallida. Combinación invalida de Email/Password.",
  "error": {
    "status": 401
  }
}
```

### API - Anuncios
-------
`GET https://host:443/api/v1/advertisements` Obtiene una lista de todos los anuncios.

`GET https://host:443/api/v1/advertisements/nombreAnuncio` Obtiene un anuncio especifico.

`GET https://host:443/api/v1/advertisements/tags` Obtiene una lista de los tags existentes.

Se debe enviar el Token obtenido de la autenticación en el Header.
```js
x-access-token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3Mm
```

### Filtrar anuncios
Para filtar la lista de anuncios se debe enviar en la query string cada uno de los campos por los cuales se desea realizar el filtro.

Todos los filtros se pueden combinar para realizar busquedas especificas.

`GET https://host:443/api/v1/advertisements/search?tag=mobile&sale=true&price=10-50&name=bic&limit=15&sort=price&start=2`

**1- Tags:** Se mostraran los anuncios que contengan por lo menos unos de los tags especificados.

`https://host:443/api/v1/advertisements/search?tag=mobile&tag=lifestyle`


**2- Tipo de anuncio:**

`https://host:443/api/v1/advertisements/search?sale=true` Anuncios de venta

`https://127.0.0.1:443/api/v1/advertisements/search?sale=false` Anuncio de compra

**3- Rango de precio:**

Buscar anuncios con precio entre 10 y 50.

`https://host:443/api/v1/advertisements/search?price=10-50`

Buscar anuncios que tengan precio mayor que 10.

`https://host:443/api/v1/advertisements/search?price=10-`

Buscar anuncios que tengan precio menor de 50.

`https://host:443/api/v1/advertisements/search?price=-50`

Buscar los anuncios que tengan precio igual a 80.

`https://127.0.0.1:443/api/v1/advertisements/search?price=80`

**4- Nombre del anuncio:**

Buscar anuncios los cuales el nombre empiece por el dato buscado.

`https://host:443/api/v1/advertisements/search?name=bic`

### Limitar numero de resultados:

Obtener maximo los 10 primeros anuncios.

`https://host:443/api/v1/advertisements/search?limit=10`

Descartar los dos primeros resultados.

`https://host:443/api/v1/advertisements/search?start=2`

### Ordenar anuncios

Ordenar anuncios por nombre

`https://host:443/api/v1/advertisements/search?sort=name`

Ordenar anuncios por precio

`https://host:443/api/v1/advertisements/search?sort=price`

## API - PushToken
-------
Para registrar los pushToken de los dispositivos use el siguiente recurso:

`POST http://host:443/api/v1/pushtokens`

Modelo de pushToken:

```js
{
    platform: {
        type: String,
        enum: ['ios', 'android'],
        required: true
    },
    pushToken: {
        type: String,
        required: true,
        unique : true //Un pushToken puede ser registrado solo una vez
    },
    user: { // Dirección de email valida del usuario
        type: String
    }
}
```

Si el registro es exitoso obtendra una respuesta como la siguiente:

```js
{
  "success": true,
  "pushToken": {
    "__v": 0,
    "platform": "ios",
    "pushToken": "yJhbGciOJIUzI1NiIsInR5cCI6IkpXJ9.eyJpZCI6IjU3MmY4Y2I0N2E5NzRkODQ",
    "user": "victor@nodepop.com",
    "_id": "572ff3558db12e3839d1606c"
  }
}
```

Si el registro no es exitoso la respuesta sera como la siguiente:

```js
{
  "succes": false,
  "message": "Datos de pushToken incorrectos.",
  "status": 422
}
```