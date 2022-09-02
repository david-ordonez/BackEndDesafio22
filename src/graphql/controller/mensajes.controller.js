import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import ServicioMensajes from "../../services/ServicioMensajes.js";
import { MensajesType } from "../types/Mensajes.js";

const serviceMensajes = new ServicioMensajes();

const getMensajes = {
    type: new GraphQLList(MensajesType),
    descrtiption: 'Obtener Mensajes',
    resolve: async () => {
        const mensajes = await serviceMensajes.obtenerMensajes();
        return mensajes;
    }
};

const postMensaje = {
    type: MensajesType,
    args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        apellido: { type: new GraphQLNonNull(GraphQLString) },
        edad: { type: new GraphQLNonNull(GraphQLInt) },
        alias: { type: new GraphQLNonNull(GraphQLString) },
        avatar: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        fecha: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, { email, nombre, apellido, edad, alias, avatar, text, fecha }) => {
        const added = serviceMensajes.guardarMensaje({
            email,
            nombre,
            apellido,
            edad,
            alias,
            avatar,
            text,
            fecha
        });
        return added;
    }
}

const putMensaje = {
    type: MensajesType,
    args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        apellido: { type: new GraphQLNonNull(GraphQLString) },
        edad: { type: new GraphQLNonNull(GraphQLInt) },
        alias: { type: new GraphQLNonNull(GraphQLString) },
        avatar: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        fecha: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, { email, nombre, apellido, edad, alias, avatar, text, fecha }) => {
        const result = serviceMensajes.guardarMensaje({
            email,
            nombre,
            apellido,
            edad,
            alias,
            avatar,
            text,
            fecha
        });
        return result;
    }
}

const delMensaje = {
    type: MensajesType,
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, { id }) => {
        const deleted = serviceMensajes.borrar(id)
        return deleted;
    }
}

const MensajesController = {
    mutations: {
        postMensaje,
        putMensaje,
        delMensaje
    },
    queries: {
        getMensajes
    }
}

export { MensajesController }