import ContenedorSQL from './../contenedores/ContenedorSQL.js';
import ContenedorArchivo from './../contenedores/ContenedorArchivo.js';
import ContenedorMemoria from './../contenedores/ContenedorMemoria.js';
import config from '../config.js';
import { asDto } from '../dtos/ProductoDTO.js';

const opcion = process.argv[2] || 'Mem';
const rutaArchivoProductos = `${config.fileSystem.path}/productos.json`;

let dao

switch (opcion) {
    case 'DB':
        dao = ContenedorSQL.getInstance(config.sqlite3,'productos', asDto);
        break
    case 'File':
        dao = ContenedorArchivo.getInstance(rutaArchivoProductos, asDto)   
        break
    default:
        dao = ContenedorMemoria.getInstance(asDto)
}

export default class ProductosDaoFactory {
    static getDao() {
        return dao
    }
}
