import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { ProductosController } from "./controller/productos.controller.js";

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: {
        ...ProductosController.queries,
    },
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: {
        ...ProductosController.mutations,
    },
});

const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});

export { schema };