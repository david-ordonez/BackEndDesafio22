import ServicioProductos from "../services/ServicioProductos.js";

export default class ControladorProductos{
    constructor(){
        this.servicioProductos = new ServicioProductos();
    }

    obtenerProductos = async (req,res) => {
        try {
            const productos = await this.servicioProductos.obtenerProductos();
            res.send(productos);
        } catch (error) {
            console.log('error al obtener productos', error);
            res.status(500).json({ error: error.message });
        }
    }

    guardarProductos = async (req,res) => {
        try {
            const producto = req.body;
            const productoGUardado = this.servicioProductos.guardarProducto(producto);
            res.json(productoGUardado);
        } catch (error) {
            console.log('error al guardar productos', error);
            res.status(500).json({ error: error.message });
        }
    }

    actualizarProducto = async (req,res) => {
        try {
            const producto = req.body;
            const productoGUardado = this.servicioProductos.actualizarProducto(producto);
            res.json(productoGUardado);
        } catch (error) {
            console.log('error al actualizar productos', error);
            res.status(500).json({ error: error.message });            
        }
    }

    borrarProducto = async (req, res) => {
        try {
            const id = req.params.id;
            await this.servicioProductos.borrarProducto(id);
            res.send();
        } catch (error) {
            console.log('error al borrar productos', error);
            res.status(500).json({ error: error.message });   
        }
    }
}