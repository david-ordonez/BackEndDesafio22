import Mensaje from '../models/Mensajes.js';
import MensajesDaoFactory from './../daos/MensajesDaoFactory.js';
import { asDto } from '../dtos/ProductoDTO.js'

export default class MensajesRepo {
    #dao

    constructor() {
        this.#dao = MensajesDaoFactory.getDao()
    }

    async getAll() {
        const mensajes = await this.#dao.listarAll();
        return mensajes.map(p => new Mensaje(p))
    }

    async getById(idBuscado) {
        const dto = await this.#dao.listar(idBuscado)
        return new Mensaje(dto)
    }

    async add(personaNueva) {
        await this.#dao.guardar(asDto(personaNueva))
    }

    async removeById(idBuscado) {
        const removida = await this.#dao.borrar(idBuscado)
        return new Mensaje(removida)
    }

    async removeAll() {
        await this.#dao.borrarAll()
    }
}