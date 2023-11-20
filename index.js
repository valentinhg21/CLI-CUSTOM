#!/usr/bin/env node

import { execSync } from "node:child_process";
import inquirer from 'inquirer';
import chalk from 'chalk';

const runCommand = command => {
    try{
        execSync(`${command}`, {stdio: 'inherit'})
    }catch(err){
        console.log(err)
        return false;
    }

    return true;
}


inquirer
  .prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Seleccionar template!',
      choices: [
        'Template Wordpress + Plantillas',
        'Template Wordpress + Bloques',
        'Template HTML CSS Y SCSS',
      ],
    },
    {
        name: 'nombre',
        type: 'input',
        message: 'Nombre del proyecto:',
        validate: function (input) {
          if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
          else return 'Escribir nombre del proyecto';
        },
      },
  ])
  .then((answers) => {
    // Nombre del template seleccionado
    const templateSelected = answers['template'];
    // Nombre del proyecto
    const repoName = answers['nombre'];
    // GIT URL DEL TEMPLATE
    let gitCheckoutCommand = '';
    const installDepsCommand = `cd ${repoName} && npm install`
    if(templateSelected == 'Template Wordpress + Plantillas'){
        gitCheckoutCommand = `git clone --depth 1 https://github.com/valentinhg21/plantilla ${repoName}`
    }
    if(templateSelected == 'Template Wordpress + Bloques'){
        gitCheckoutCommand = `git clone --depth 1 https://github.com/valentinhg21/plantilla ${repoName}`
       
    }
    if(templateSelected == 'Template HTML CSS Y SCSS'){
        gitCheckoutCommand = `git clone --depth 1 https://github.com/valentinhg21/plantilla ${repoName}`
  
    }

    // Clonar proyecto
    const checkedOut = runCommand(gitCheckoutCommand);
    if(!checkedOut) process.exit(-1);
    
    console.log(chalk.blue.bold(`Instalando paquetes para ${repoName}`))

    // Instalar dependencias
    const installDeps = runCommand(installDepsCommand);
    if(!installDeps) process.exit(-1);
    

    // Mensaje de confirmacion
    console.log(chalk.green.bold('¡El template se instalo corrrectamente!'))
  

  });



