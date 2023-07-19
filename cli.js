#!/usr/bin/env node
import {mdLinks} from './app.js'
import chalk from 'chalk';

const document = process.argv[2];

const isOptionValidate = process.argv.includes('--validate');
//console.log(chalk.bold.white(isOptionValidate))

const isOptionStats = process.argv.includes('--stats');
//console.log(chalk.bold.white(isOptionStats))

const options = {
    validate: isOptionValidate,
    stats: isOptionStats,
}


mdLinks(document, options)
.then((links)=>{
    if (options.validate && options.stats) {
        console.log(chalk.bold.blue('Total: ' + links.total))
        console.log(chalk.bold.blue('Unique: ' + links.unique))
        console.log(chalk.bold.green('Working: ' + links.working))
        console.log(chalk.bold.red('Broken: ' +links.broken))

      }else if(options.validate){
        links.forEach(link => {
           console.log(chalk.bold.gray(link.file + ' ' + link.href + ' ' + link.mensaje + ' ' + link.status + ' ' + link.text))
        });

      }else if(options.stats) {
        console.log(chalk.bold.green('Total: ' + links.total))
        console.log(chalk.bold.green('Unique: ' + links.unique))

      }else{
        links.forEach(link => {
            console.log(chalk.bold.yellow(link.file + ' ' + link.href + ' ' + link.text))
         });
      }

})
.catch((err)=>{
console.log(err, 22)
})




/// cuadno este el star primer tener la funcion para los links, href, test, validate, despues el axios, funcion isvaldite true que sea asincorna y consuma el axios
// funciones de estadisticas, terminar ek true

