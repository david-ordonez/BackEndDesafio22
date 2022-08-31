import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla, dto) {
        this.knex = knex(config)
        this.tabla = tabla
        this.dto = dto;
    }

    static getInstance(config, tabla, dto) {
        if (!instance) {
            instance = new ContenedorSQL(config, tabla, dto);
        }
        return instance;
    }

    async listar(id) {
        const arreglo = await this.knex.from(this.tabla).select('*').where('id', id);
        return this.dto(arreglo);
    }

    async listarAll() {
        return await this.knex.from(this.tabla).select('*');
    }

    async guardar(elem) {
        return await this.knex.from(this.tabla).insert(elem);
    }

    async actualizar(elem) {
        return await this.knex.from(this.tabla).where(elem.id).update(elem);
    }

    async borrar(id) {
        return await this.knex.from(this.tabla).where('id', id).del();
    }

    async borrarAll() {
        return await this.knex.from(this.tabla).del();
    }

    async desconectar() {
        await this.knex.destroy();
    }
}

export default ContenedorSQL