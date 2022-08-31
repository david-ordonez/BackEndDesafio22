let instance;

class ContenedorMemoria {

    constructor(dto) {
        this.elementos = []
        this.dto = dto;
    }

    static getInstance(dto) {
        if (!instance) {
            instance = new ContenedorMemoria(dto);
        }
        return instance;
    }

    listar(id) {
        const elem = this.elementos.find(elem => elem.id == id)
        return this.dto(elem) || { error: `elemento no encontrado` }
    }

    listarAll() {
        const elementos = [...this.elementos];
        return this.dto(elementos);
    }

    guardar(elem) {

        let newId
        if (this.elementos.length == 0) {
            newId = 1
        } else {
            newId = this.elementos[this.elementos.length - 1].id + 1
        }

        const newElem = { ...elem, id: newId }
        this.elementos.push(newElem)
        return this.dto(newElem);
    }

    actualizar(elem) {
        const newElem = { ...elem, id: Number(elem.id) }
        const index = this.elementos.findIndex(p => p.id == elem.id)
        if (index == -1) {
            return { error: `elemento no encontrado` }
        } else {
            this.elementos[index] = newElem
            return this.dto(newElem);
        }
    }

    borrar(id) {
        const index = this.elementos.findIndex(elem => elem.id == id)
        if (index == -1) {
            return { error: `elemento no encontrado` }
        } else {
            return this.dto(this.elementos.splice(index, 1));
        }
    }

    borrarAll() {
        this.elementos = []
    }
}

export default ContenedorMemoria
