import ServicioMensajes from "../services/ServicioMensajes.js";

export default class ControladorMensajes{
    constructor(){
        this.servicioMensajes = new ServicioMensajes();
    }

    obtenerMensajes = async (req,res) => {
        try {
            const mensajes = await this.servicioMensajes.obtenerMensajes();
            res.send(mensajes);
        } catch (error) {
            console.log('error al obtener mensajes', error);
            res.status(500).json({ error: error.message });
        }
    }

    guardarMensajes = async (req,res) => {
        try {
            const mensaje = req.body;
            const mensajeGUardado = this.servicioMensajes.guardarMensaje(mensaje);
            res.json(mensajeGUardado);
        } catch (error) {
            console.log('error al guardar mensajes', error);
            res.status(500).json({ error: error.message });
        }
    }

    actualizarMensaje = async (req,res) => {
        try {
            const mensaje = req.body;
            const mensajeGUardado = this.servicioMensajes.actualizarMensaje(mensaje);
            res.json(mensajeGUardado);
        } catch (error) {
            console.log('error al actualizar mensajes', error);
            res.status(500).json({ error: error.message });            
        }
    }

    borrarMensaje = async (req, res) => {
        try {
            const id = req.params.id;
            await this.servicioMensajes.borrarMensaje(id);
            res.send();
        } catch (error) {
            console.log('error al borrar mensajes', error);
            res.status(500).json({ error: error.message });   
        }
    }
}