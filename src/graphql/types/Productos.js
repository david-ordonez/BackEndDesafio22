import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLFloat
} from 'graphql';

const ProductoType = new GraphQLObjectType({
    name: "Producto",
    description: "Producto Type",
    fields: () => ({
        id: { type: GraphQLID },
        nombre: { type: GraphQLString },
        precio: { type: GraphQLFloat },
        foto: { type: GraphQLString }
    })
});

export { ProductoType };