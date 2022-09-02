import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql';

const MensajesType = new GraphQLObjectType({
    name: "Mensaje",
    description: "Mensaje Type",
    fields: () => ({
            email: { type: GraphQLString },
            nombre: { type: GraphQLString },
            apellido: { type: GraphQLString },
            edad: { type: GraphQLInt },
            alias: { type: GraphQLString },
            avatar: { type: GraphQLString },
        text: { type: GraphQLString },
        fecha: { type: GraphQLString }
    })
});

export { MensajesType };