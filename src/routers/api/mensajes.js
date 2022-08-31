import { Router } from 'express'
import ControladorMensajes from '../../controllers/ControladorMensajes.js';


const mensajesApiRouter = new Router();
const mensajesController = new ControladorMensajes();

mensajesApiRouter.post('/api/mensajes', mensajesController.guardarMensajes);
mensajesApiRouter.get('/api/mensajes', mensajesController.obtenerMensajes);
mensajesApiRouter.put('/api/mensajes', mensajesController.actualizarMensaje);
mensajesApiRouter.delete('/api/mensajes', mensajesController.borrarMensaje);

export default mensajesApiRouter