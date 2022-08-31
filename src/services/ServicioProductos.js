import productosApi from "../api/productos.js";

export default class ServicioProductos {
    constructor(){
        this.productosDAO = productosApi;
    }

    async obtenerProductos(){
        return await this.productosDAO.listarAll();
    }

    async obtenerProducto(id) {
        return await this.productosDAO.listar(id);
    }

    async guardarProducto(producto){
        return await this.productosDAO.guardar(producto);
    }

    async actualizar(producto){
        return await this.productosDAO.actualizar(producto);
    }

    async borrar(id){
        return await this.productosDAO.borrar(id);
    }
}