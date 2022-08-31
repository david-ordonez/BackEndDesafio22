class Author {
    constructor({email,nombre,apellido,edad,alias,avatar}){
        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.alias = alias;
        this.avatar = avatar;
    }
}

export default class MensajeDTO {
    constructor({author, text, fecha}){
        this.author = new Author(author);
        this.text = text;
        this.fecha = fecha;
    }
}

export function asDto(mensaje){
    if(Array.isArray(mensaje)){
        return mensaje.map(m => new MensajeDTO(m));
    } else {
        return new MensajeDTO(mensaje);
    }
}