# Markdown Links

## Índice
* [1. Diagrama de flujo](#1-diagrama-de-flujo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Guía de instalación](#3-guía-de-instalación)
* [4. Explicacion de la libreria](#4-explicacion-de-la-libreria)
* [5. Documentacion tecnica de la libreria](#5-documentacion-tecnica-de-la-libreria)
* [6. Checklist](#6-checklist)


***

## 1. Diagrama de flujo
![diagramaDeFlujo](https://github.com/carolinamoralese/DEV007-md-links/blob/e9fc908e84e1da43d3648b696616a8c13cabbebe/imagenes/imagenSeis.png)


## 2. Resumen del proyecto

Markdown es un lenguaje de marcado ligero muy popular entre desarrolladores. Se utiliza en numerosas plataformas que manejan texto plano, como GitHub, foros, blogs, entre otros. Es común encontrar varios archivos en formato Markdown en diversos repositorios, empezando por el tradicional README.md.

Estos archivos Markdown suelen incluir enlaces (vínculos/ligas) que a menudo están rotos o ya no son válidos, lo cual afecta considerablemente el valor de la información que se desea compartir.

Recientemente, en una comunidad de código abierto, se nos ha propuesto crear una herramienta utilizando Node.js. Esta herramienta tendría la capacidad de leer y analizar archivos en formato Markdown, con el propósito de verificar los enlaces que contengan y proporcionar informes estadísticos al respecto.

## 3. Guía de instalación

Puede utilizar esta biblioteca como aplicación CLI o como API.

## 1) JavaScript API

- Instalación

Para utilizar la biblioteca como una API, siga estos pasos:

Clonar este repositorio
Abra su terminal y use el comando cd para ir a la carpeta donde desea guardar el proyecto.
Ejecute el siguiente comando: git clone https://github.com/carolinamoralese/DEV007-md-links
Abra la carpeta en su software de edición de código.
Abre la terminal y podrás comenzar a usar la API.

- Usabilidad

Deberás usar el siguiente comando en tu terminal:

node cli.js [options]


## 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

- Instalación

Abre tu terminal y ejecuta el siguiente comando:

npm i md-links-caro-morales

- Usabilidad

Una vez completada la instalación, ejecute el siguiente comando en su terminal:

npx md-links-caro-morales [options]



## 4. Explicacion de la libreria

En primer lugar, se solicita al usuario que introduzca la ruta del archivo que desea leer.

Si el usuario ingresa un arhivo que no existe aparecera un mensaje donde indica que la ruta ingresada no existe.
![ingresoPath](https://github.com/carolinamoralese/DEV007-md-links/blob/8a7f97eb261ad9b437e7680e5c51bce7ac9fb8fa/imagenes/Captura%20de%20pantalla%202023-07-19%20a%20la(s)%203.45.10%20p.m..png)


Si el usuario ingreso una ruta existente de tipo MD, el programa la leera y mostrara los Links encontrados.

El comportamiento por defecto no debe validar si las URLs responden ok o no, solo debe identificar el archivo markdown (a partir de la ruta que recibe como argumento), analizar el archivo Markdown e imprimir los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link 

![ingresoPath](https://github.com/carolinamoralese/DEV007-md-links/blob/e9fc908e84e1da43d3648b696616a8c13cabbebe/imagenes/imagenUno.png)


Si el usuario ingresa la opcion --validate, el módulo debe hacer una petición HTTP para averiguar si el link funciona o no (en caso de estar funcionando arroja el codigo 200 junto al mensaje "OK" y en caso de que el link no este funcionado arrojara el codigo 404 y el mensaje "Fail", Y en caso de no reconocer el Link muestra Undefined y el mensaje será "Fail")

![ingresoValidate](https://github.com/carolinamoralese/DEV007-md-links/blob/e9fc908e84e1da43d3648b696616a8c13cabbebe/imagenes/imagenDos.png)


Si el usuario ingresa la opcion --stats, podra ver en la terminal una estadistica de los links, esto quiere decir cuantos links en total encontro y cuantos links no esta repetidos.

![ingresoStats](https://github.com/carolinamoralese/DEV007-md-links/blob/e9fc908e84e1da43d3648b696616a8c13cabbebe/imagenes/imagenCuatro.png)


Si el usuario ingresa las opciones --validate --stats, podra ver en la terminal el estado de cada link junto a una estadistica.

![ingresoStatsValidate](https://github.com/carolinamoralese/DEV007-md-links/blob/e9fc908e84e1da43d3648b696616a8c13cabbebe/imagenes/imagenCinco.png)



## 5. Documentacion tecnica de la libreria

![documentacion](https://github.com/carolinamoralese/DEV007-md-links/blob/729fda8ae31b32b31d6db60ec11256cf71a7d0da/imagenes/documentacion.png)

## 6. Checklist

### General

* [x] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

* [x] Un board con el backlog para la implementación de la librería.
* [x] Documentación técnica de la librería.
* [x] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

* [x] El módulo exporta una función con la interfaz (API) esperada.
* [x] Implementa soporte para archivo individual
* [x] Implementa soporte para directorios
* [x] Implementa `options.validate`

### CLI

* [x] Expone ejecutable `md-links` en el path (configurado en `package.json`)
* [x] Se ejecuta sin errores / output esperado
* [x] Implementa `--validate`
* [x] Implementa `--stats`

### Pruebas / tests

* [x] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [x] Pasa tests (y linters) (`npm test`).


