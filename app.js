import {
  routeExists,
  routeAbsolute,
  fileOrDir,
  getMdExtension,
  processFile,
  getLinks,
  linksFalse,
  linksTrue
} from "./index.js";

import chalk from "chalk";

//const document = process.argv[2];




export const mdLinks = (document, options) => {
    return new Promise((resolve, reject) => {
      const isExists = routeExists(document);
      if (isExists) {
        const absolute = routeAbsolute(document);
        console.log(chalk.bold.bgGreen(absolute));
        const archivos = fileOrDir(document);
        console.log(chalk.bold.blue(archivos, 12));
        const filesMd = getMdExtension(archivos);
        console.log(chalk.bold.red(filesMd, 15));
        // averiguar como ejecutar función asíncrona then catch
        processFile(filesMd)
        //console.log(filesMd, 26)
        .then((data) => {
          const links = getLinks(data)
          if(options.validate){
            const validatedLlinks = linksTrue(links);
            resolve(validatedLlinks)
          } 
          resolve(links)
        })
        .catch((err) =>{
          reject(err)
        })
        
      } else {
        console.error("ERROR");
      }
   })
}
//mdLinks(document);