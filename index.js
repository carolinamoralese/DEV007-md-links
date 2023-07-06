import fs from "fs";
import path from "path";
import chalk from "chalk";

/*------------------------------------------------FUNCION QUE LEE LA RUTA Y BUSCA ARCHIVO -------------------------------*/

export function routeExists(route) {
  // parametro
  if (fs.existsSync(route)) {
    // console.log("El archivo EXISTE!");
    return true;
  } else {
    console.warn(chalk.bold.red("El archivo NO FUE ENCONTRADO!"));
    return false;
  }
}

/*------------------------------------------------VERIFICA LA RUTA ABSOLUTA Y CONVIERTE A RUTA ABSOLUTA -------------------------------*/

export function routeAbsolute(route) {
  if (path.isAbsolute(route) === true) {
    // console.log(route);
    return route;
  } else {
    //console.log( path.resolve(route));
    return path.resolve(route);
  }
}

/*------------------------------------------------OBTIENE LOS ARCHIVOS DE UN DIRECTORIO-------------------------------*/

/*function getFilesFromDir(route) {
  fs.promises.readdir(route, { withFileTypes: true }) // retorna como un objeto carpeta o archivo, de lo contrario seria un string
    .then(files => {
      files.forEach((file) => {
        if (file.isFile()) {
          console.log(chalk.bold.bgGreen(file.name + ' Es un archivo'));
          //comprueba si la ruta es un directorio
        } else if (file.isDirectory()) {
          console.log(chalk.bold.bgRed(file.name + ' Es una carpeta'));
          getFilesFromDir(route + '/' + file.name);
        }

      });
    })
}*/

// VERIFICAR SI ES UN DIRECTORIO O ARCHIVO
export function fileOrDir(route) {
  let arrayFiles = [];
  const stats = fs.statSync(route);
  if (stats.isFile()) {
    arrayFiles.push(route);
  } else if (stats.isDirectory()) {
    const files = fs.readdirSync(route, "utf-8");
    files.forEach((file) => {
      const newRoute = path.join(route, file);
      const statsNew = fs.statSync(newRoute);
      if (statsNew.isFile()) {
        arrayFiles.push(newRoute);
      } else if (statsNew.isDirectory()) {
        arrayFiles = arrayFiles.concat(fileOrDir(newRoute));
      }
    });
  }
  return arrayFiles;
}

/*------------------------------------------------VERIFICA SI ES UN ARCHIVO O UN DIRECTORIO-------------------------------*/

/*export function processRoute(route) {
  // obtiene informacion sobre la ruta
  fs.stat(route, (err, fileInfo) => {
    // comprueba si la ruta es una archivo
    if (fileInfo.isFile()) {
      console.log(chalk.bold.bgGreen('Es un archivo'));
      //muestra la extension del archivo

      const fileExtension = path.extname(route)
      console.log(chalk.bold.bgYellow('la extension de archivo es ' + fileExtension))
      if (fileExtension === '.md') {
        processFile(route)
      }

      //comprueba si la ruta es un directorio
    } else if (fileInfo.isDirectory()) {
      console.log(chalk.bold.bgRed('la ruta ingresada es una carpeta: ' + route));
      //si es una carpeta llama de nuevo a la funcion para obtener carpetas dentro de un archivo
      getFilesFromDir(route)
    }
  });
}*/

/*------------------------------------------------VERIFICA SI HAY ARCHIVO Y PROCESARLO-------------------------------*/
export function processFile(route) {
  // este debe ser asincrono debe tener una promesa debo de ejecutar la promesa
  fs.readFile(route, "utf8", (err, file) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(file);
  });
}

// FILTRAR SOLO LOS DE EXTENSIÓN MD
export function getMdExtension(arrayFiles) {
  return arrayFiles.filter((file) => path.extname(file) === ".md");
}
