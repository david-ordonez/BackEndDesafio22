import { Router } from 'express'
import { createNFakeProducts } from '../../mocks/productos.js'
import ControladorProductos from '../../controllers/ControladorProductos.js'

const productosApiRouter = new Router();
const productosController = new ControladorProductos();

productosApiRouter.get('/api/productos-test', (req, res) => { res.json(createNFakeProducts(5)) })
productosApiRouter.post('/api/producto', productosController.guardarProductos);
productosApiRouter.get('/api/producto', productosController.obtenerProductos);
productosApiRouter.put('/api/producto', productosController.actualizarProducto);
productosApiRouter.delete('/api/producto', productosController.borrarProducto);

export default productosApiRouter