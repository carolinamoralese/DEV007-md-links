import {mdLinks} from './app.js'
import chalk from 'chalk';

const document = process.argv[2];

const isOptionValidate = process.argv.includes('--validate');
console.log(chalk.bold.white(isOptionValidate))

const isOptionStats = process.argv.includes('--stats');
console.log(chalk.bold.white(isOptionStats))

const options = {
    validate: isOptionValidate,
    stats: isOptionStats,
}


mdLinks(document, options)
.then((links)=>{
console.log(links,19)
})
.catch((err)=>{
console.log(err, 22)
})




/// cuadno este el star primer tener la funcion para los links, href, test, validate, despues el axios, funcion isvaldite true que sea asincorna y consuma el axios
// funciones de estadisticas, terminar ek true

/*if(isOptionValidate && !isOptionStats){
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
}*/
