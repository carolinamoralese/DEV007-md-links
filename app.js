import {
  routeExists,
  routeAbsolute,
  fileOrDir,
  getMdExtension,
  processFile,
  getLinks,
  checkLinks,
  peticionHTTP,
  getStatsFromLinks,
} from './index.js';
import chalk from 'chalk';


//const document = process.argv[2];

export const mdLinks = (document, options) => {
  return new Promise((resolve, reject) => {
    const isExists = routeExists(document);
    if (isExists) {
      routeAbsolute(document);
      const archivos = fileOrDir(document);
      const filesMd = getMdExtension(archivos);
      processFile(filesMd)
        .then((data) => {
          const links = getLinks(data);
          const objsLinks = checkLinks(links);

          if (options.validate && options.stats) {

            peticionHTTP(objsLinks).then((validatedLinks) => {
              getStatsFromLinks(validatedLinks, options.validate).then((res) => resolve(res));
            });

          }else if(options.validate){

            peticionHTTP(objsLinks).then((res) => resolve(res));

          }else if(options.stats) {

            getStatsFromLinks(objsLinks, options.validate).then((res) => resolve(res));

          }else{
            resolve(objsLinks)
          }

        })
        .catch((err) => {
          reject(err);
        });
    } else {
      console.log(chalk.bold.red('La ruta ingresada no existe'))
      console.log("no es un archivo .md")
    }
  });
};
