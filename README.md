# <div align="center">Webinar CMS - Blog</div>

Bienvenido a mi repositorio 📂️ donde podrás encontrar el codigo del webinar de **Blog con CMS (Control Management System)** 🤓️

Para comenzar es muy sencillo solamente sigue los siguientes pasos de instalación y podrás ejecutar el proyecto en tu máquina 💻️! 🤩️🤩️

## Instalación

Este repositorio requiere que tengas instalado lo siguiente:

- [NodeJs](https://nodejs.org/es/) ^v12.06+
- [PostgreSQL](https://www.postgresql.org/download/)

Una vez que tengas NodeJs instalado, para comprobar corre el siguiente comando en una _terminal_ o _power shell_

```
$ node --version
```

Ahora descarga el repositorio y luego instala las _dependencies_ (o librerias 📚) de la siguiente manera dentro de la carpeta del repositorio (Nota: Puedes hacerlo con npm pero yarn es mas veloz 🚀): 🤓️

```
$ npm install --global yarn
$ yarn
```

Esto creará una carpeta con el nombre _node_modules_ y ahí se instalarán todas las librerias necesarias de nuestro proyecto.

Luego tendremos que configurar las variables que usaremos en nuestro proyecto, para ello necesitaremos crear un archivo `.env` que es ahi donde se almacenaran las variables, copiaremos la plantilla ubicada en `.env.example` y pondremos los valores de la conexion a nuestra base de datos y nuestra clave de [JWT](https://jwt.io), por ejemplo:

```
DATABASE_URL=postgresql://usuario:password@host:port/database?schema=public

SECRET_JWT=clave_urcha_archi_mega_secreta
```

Luego una vez creada la base de datos ahora tendremos que migrar las migraciones (valga la redundancia 🤪) generadas de nuestro prisma con el siguiente comando

```
$ yarn prisma migrate dev
```

Por ultimo, procederemos a levantar el proyecto 🚀

```
$ yarn start:dev
```

Si todo estara correcto se levantara nuestro proyecto exitosamente 🥳

## Extras

Si quieres visualizar los datos que se han almacenado en la base de datos, te recomiendo descargarte el siguiente software ➡️ [pgAdmin](https://www.pgadmin.org/)

## Licencia

[MIT](https://opensource.org/licenses/MIT)

**Software Libre, Hell Yeah!🤙️🤙️**
