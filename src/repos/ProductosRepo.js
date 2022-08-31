import Producto from '../models/Producto.js';
import ProductosDaoFactory from './../daos/ProductosDaoFactory.js';
import { asDto } from '../dtos/ProductoDTO.js'

export default class ProductosRepo {
    #dao

    constructor() {
        this.#dao = ProductosDaoFactory.getDao()
    }

    async getAll() {
        const productos = await this.#dao.listarAll();
        return productos.map(p => new Producto(p))
    }

    async getById(idBuscado) {
        const dto = await this.#dao.listar(idBuscado)
        return new Producto(dto)
    }

    async add(personaNueva) {
        await this.#dao.guardar(asDto(personaNueva))
    }

    async removeById(idBuscado) {
        const removida = await this.#dao.borrar(idBuscado)
        return new Producto(removida)
    }

    async removeAll() {
        await this.#dao.borrarAll()
    }
}