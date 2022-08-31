export default class ProductoDTO {
    constructor({title, price, thumbnail}){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

export function asDto(prod){
    if(Array.isArray(prod)){
        return prod.map(p => new ProductoDTO(p));
    } else {
        return new ProductoDTO(prod);
    }
}