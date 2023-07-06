import {
  routeExists,
  routeAbsolute,
  fileOrDir,
  getMdExtension,
  processFile,
} from "./index.js";

import chalk from "chalk";

const document = process.argv[2];
const isExists = routeExists(document);

const mdLinks = () => {
  if (isExists) {
    const absolute = routeAbsolute(document);
    console.log(chalk.bold.bgGreen(absolute));
    const archivos = fileOrDir(document);
    console.log(archivos, 12);
    const filesMd = getMdExtension(archivos);
    console.log(filesMd, 15);
    processFile(document);// averiguar como ejecutar función asíncrona then catch
  } else {
    console.error("ERROR");
  }
};
mdLinks(document);
// const mdLinks2 = () => {
//     return new Promise((resolve, reject) => {
//     })
// }
