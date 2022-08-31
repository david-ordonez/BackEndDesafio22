export default class Producto {
    #nombre
    #precio
    #foto

    constructor({nombre, precio, foto}){
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }

    get nombre(){
        return this.#nombre;
    }

    set nombre(nombre){
        if(!nombre) throw new Error('el nombre es un campo requerido');
        this.#nombre = nombre;
    }

    get precio(){
        return this.#precio;
    }

    set precio(precio){
        if(!precio) throw new Error('El precio es requerido');
        if(isNaN(precio)) throw new Error('El precio solo puede ser numerico');

        this.#precio = precio;
    }

    get foto(){
        return this.#foto;
    }

    set foto(foto){
        this.#foto = foto;
    }
}