import mensajesApi from './../api/mensajes.js';

export default class ServicioMensajes {
    constructor(){
        this.mensajesApi = mensajesApi;
    }

    async obtenerProductos(){
        return await this.mensajesApi.listarAll();
    }

    async obtenerProducto(id) {
        return await this.mensajesApi.listar(id);
    }

    async guardarProducto(producto){
        return await this.mensajesApi.guardar(producto);
    }

    async actualizar(producto){
        return await this.mensajesApi.actualizar(producto);
    }

    async borrar(id){
        return await this.mensajesApi.borrar(id);
    }
}