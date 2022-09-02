import mensajesApi from './../api/mensajes.js';

export default class ServicioMensajes {
    constructor(){
        this.mensajesApi = mensajesApi;
    }

    async obtenerMensajes(){
        return await this.mensajesApi.listarAll();
    }

    async obtenerMensaje(id) {
        return await this.mensajesApi.listar(id);
    }

    async guardarMensaje(mensaje){
        return await this.mensajesApi.guardar(mensaje);
    }

    async actualizar(mensaje){
        return await this.mensajesApi.actualizar(mensaje);
    }

    async borrar(id){
        return await this.mensajesApi.borrar(id);
    }
}