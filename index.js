import fs from "fs";
import path from "path";
import chalk from "chalk";
import axios from "axios";

//axios.get('https://www.canva.com/').then((res) => {
 //// console.log(res, 90)
//})

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
export function processFile(arrayFiles) {
  return new Promise((resolve, reject) => {
    arrayFiles.forEach((file) => {
      // este debe ser asincrono debe tener una promesa debo de ejecutar la promesa
      fs.readFile(file, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        }
        const arrayData = data.split("\n");
        resolve(arrayData);
      });
    });
  });
}

// FILTRAR SOLO LOS DE EXTENSIÓN MD
export function getMdExtension(arrayFiles) {
  return arrayFiles.filter((file) => path.extname(file) === ".md");
}

// VERIFICAR SI TIENEN LINKS
/*export function getLinks(arrayLinks){
  const links = []
  const route = path.resolve()
  arrayLinks.forEach((elem)=>{
    
    if(elem.match(/\[(.*?)\]\((.*?)\)/g)){
      let linkMatch = elem.match(/\[(.*?)\]\((.*?)\)/g)
      links.push({
        href: linkMatch[0].match(/https*?:([^"')\s]+)/)[0],
        text: linkMatch[0].match(/\[(.*)\]/)[1],
        file: route
      })
    }
  })
  console.table(links)
  return links;
  }*/

// VERIFICAR SI TIENEN LINKS
export function getLinks(array) {
  const links = [];
  const regex = /\[.+?\]\(.+?\)/g;
  array.forEach((link) => {
    const linkMatches = link.match(regex);
    if (linkMatches) {
      links.push(...linkMatches);
    }
  });
  // console.table(links);
  return links;
}

// VERIFICAR EL LINK ES TRUE
/*export function validateTrue(links) {
  const trueLinks = [];
  links.forEach((link) => {
    let ruta = path.resolve();
    if (link.match(/\[.+?\]\(.+?\)/g)) {
      let linkTrue = link.match(/\[.+?\]\(.+?\)/g);
      trueLinks.push({
        href: linkTrue[0].match(/https*?:([^"')\s]+)/)[0],
        text: linkTrue[0].match(/\[(.*?)\]/)[1],
        file: ruta,
        ok: "ok",
        HTTP: "validate",
      });
    }
  });
  console.log(trueLinks, 99);
  return trueLinks;
}*/

// VERIFICAR EL LINK ES FALSE
export function linksFalse(links, isValidateTrue) {
  const falseLinks = [];
  links.forEach((link) => {
    let ruta = path.resolve();
    if (link.match(/\[.+?\]\(.+?\)/g)) {
      let linkFalse = link.match(/\[.+?\]\(.+?\)/g);
      
      const linkObject = {
        href: linkFalse[0].match(/https*?:([^"')\s]+)/)[0],
        text: linkFalse[0].match(/\[(.*?)\]/)[1],
        file: ruta,
      }

      if (!isValidateTrue) {
        falseLinks.push(linkObject)
      } else {
        falseLinks.push({...linkObject, ok: 'ok', HTTP: "validate"})
      }
    }
  });
  console.log(falseLinks);
  return falseLinks;
}
