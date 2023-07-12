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

const document = process.argv[2];
const isExists = routeExists(document);
const isOptionValidate = process.argv.includes('--validate');
console.log(chalk.bold.white(isOptionValidate))

const isOptionStats = process.argv.includes('--stats');
console.log(chalk.bold.white(isOptionStats))



const mdLinks = () => {
    return new Promise((resolve, reject) => {
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
          resolve(data)
          const links = getLinks(data)

          
        if(isOptionValidate && !isOptionStats){
            linksTrue(links);
            console.log('Stats: ', isOptionStats)
            console.log('Validate: ', isOptionValidate)
        } 
        if (isOptionValidate && isOptionStats){
            console.log('ejecuta validate y states');
            console.log('Stats: ', isOptionStats)
            console.log('Validate: ', isOptionValidate)
            linksTrue(links);                
        }
        if (isOptionStats && !isOptionValidate){
            console.log('ejecuta states');
            console.log('Stats: ', isOptionStats)
            console.log('Validate: ', isOptionValidate)
            linksFalse(links);
        }
        })
        .catch((err) =>{
          reject(err)
        })
        
      } else {
        console.error("ERROR");
      }
   })
}
mdLinks(document);