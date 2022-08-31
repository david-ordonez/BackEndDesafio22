import { Router } from 'express'
import { fork } from 'child_process';

import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '');


const randomApiRouter = new Router()

randomApiRouter.get('/random', (req, res) => {
    let { cant } = parseInt(req.query);
    if(!cant){
       cant = 100000000; 
    }
    const computo = fork(__dirname + '/fork/computo.js');
    computo.send({
        'mensaje' : 'start',
        'cant' : cant
    });
    computo.on('message', res => {
        res.json(res);
    })
})

export default randomApiRouter