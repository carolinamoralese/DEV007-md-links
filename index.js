import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import axios from 'axios';

/*------------------------------------------------FUNCION QUE LEE LA RUTA Y BUSCA ARCHIVO -------------------------------*/
export function routeExists(route) {
  // parametro
  if (fs.existsSync(route)) {
    return true;
  } else {
    return false;
    
  }
}

/*------------------------------------------------VERIFICA LA RUTA ABSOLUTA Y CONVIERTE A RUTA ABSOLUTA -------------------------------*/

export function routeAbsolute(route) {
  if (path.isAbsolute(route) === true) {
    return route;
  } else {
    return path.resolve(route);
  }
}

/*------------------------------------------------VERIFICAR SI ES UN DIRECTORIO O ARCHIVO-------------------------------*/

export function fileOrDir(route) {
  let arrayFiles = [];
  const stats = fs.statSync(route);
  if (stats.isFile()) {
    arrayFiles.push(route);
  } else if (stats.isDirectory()) {
    const files = fs.readdirSync(route, 'utf-8');
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

/*------------------------------------------------VERIFICA SI HAY ARCHIVO Y PROCESARLO-------------------------------*/
export const processFile = (arrayFiles) => {
  const allFiles = [];
  arrayFiles.forEach((file) => {
    allFiles.push(
    new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  })
  );
  });
  return Promise.all(allFiles);
};

/*------------------------------------------------FILTRAR SOLO LOS DE EXTENSIÓN MD-------------------------------*/
export function getMdExtension(arrayFiles) {
  return arrayFiles.filter((file) => path.extname(file) === '.md');
}

/*------------------------------------------------VERIFICAR SI TIENEN LINKS-------------------------------*/
export function getLinks(array) {
  const links = [];
  const regex = /\[.+?\]\(.+?\)/g;
  array.forEach((link) => {
    const linkMatches = link.match(regex);
    if (linkMatches) {
      links.push(...linkMatches);
    }
  });
  return links;
}

/*------------------------------------------------VERIFICAR EL LINK -------------------------------*/
export function checkLinks(links) {
  const arrayLinks = [];
  links.forEach((link) => {
    let ruta = path.resolve();
    if (link.match(/\[.+?\]\(.+?\)/g)) {
      let linkFalse = link.match(/\[.+?\]\(.+?\)/g);
      const linkObject = {
        href: linkFalse[0].match(/https*?:([^"')\s]+)/)[0],
        text: linkFalse[0].match(/\[(.*?)\]/)[1],
        file: ruta,
      };
      arrayLinks.push(linkObject);
    }
  });
  return arrayLinks;
}

/*------------------------------------------------PETICION HTTP---------------------------------------------*/
export function peticionHTTP(arrObjs) {
  const arrayPromises = arrObjs.map((obj) => {
    return axios
      .get(obj.href)
      .then((response) => {
        obj.status = response.status;
        obj.mensaje = response.statusText;
        return obj;
      })
      .catch((err) => {
        obj.mensaje = 'Fail';
        if(err.response){
          obj.status = err.response.status;
        }
        return obj;
      });
  });
  return Promise.all(arrayPromises);
}


/*------------------------------------------------OBTENER ESTADISTICAS---------------------------------------------*/
export function getStatsFromLinks(arrObjs,isOptionValidate) {
  return new Promise((resolve, reject) => {
    const allStats = {
      total: arrObjs.length,
      unique: new Set(arrObjs.map((link) => link.href)).size,
    }
    if(isOptionValidate){
      allStats.working = arrObjs.filter( obj => obj.mensaje == 'OK').length;
      allStats.broken = arrObjs.filter( obj => obj.mensaje == 'Fail').length;
    }
    resolve(allStats);
  });

}



