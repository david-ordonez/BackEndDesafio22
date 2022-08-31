import { Router } from 'express'
import os  from 'os';
import compression from 'compression';

const infoWebRouter = new Router();
const infoObject = {
    "Argumentos de entrada": process.argv,
    "Sistema Operativo": process.platform,
    "Version de node" : process.version,
    "Memoria total reservada": process.memoryUsage().rss,
    "Path de ejecucion" : process.execPath,
    "Process id" : process.pid,
    "Carpeta del proyecto": process.cwd(),
    "Numero Procesadores": os.cpus().length
   };


infoWebRouter.get('/info', compression(), (req, res) => {
    console.log(JSON.stringify(infoObject));
    res.json(infoObject);
})

infoWebRouter.get('/infoSin', (req, res) => {
    res.json(infoObject);
})

export default infoWebRouter