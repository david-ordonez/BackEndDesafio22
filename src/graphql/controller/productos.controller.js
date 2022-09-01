import { GraphQLID, GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import ServicioProductos from '../../services/ServicioProductos.js';
import { ProductoType } from '../types/Productos.js';

const serviceProducto = new ServicioProductos();

const getProductos = {
    type: new GraphQLList(ProductoType),
    descrtiption: 'Obtener productos',
    resolve: async() => {
        const productos = await serviceProducto.obtenerProductos();
        return productos;
    }
};

const postProducto = {
    type: ProductoType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        precio: { type: new GraphQLNonNull(GraphQLFloat) },
        foto: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, {id, nombre, precio, foto}) => {
        const added = serviceProducto.guardarProducto({
            id,
            nombre, 
            precio,
            foto
        });
        return added;
    }
}

const putProducto = {
    type: ProductoType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        precio: { type: new GraphQLNonNull(GraphQLFloat) },
        foto: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, {id, nombre, precio, foto}) => {
        const result = serviceProducto.actualizarProducto({
            id,
            nombre, 
            precio,
            foto
        });
        return result;
    }
}

const delProducto = {
    type: ProductoType,
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, { id }) => {
        const deleted = serviceProducto.borrarProducto(id)
        return deleted;
    }
}

const ProductosController = {
    mutations: {
        postProducto,
        putProducto,
        delProducto
    },
    queries: {
        getProductos
    }
}

export { ProductosController }