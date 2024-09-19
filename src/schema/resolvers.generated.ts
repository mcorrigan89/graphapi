/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { userById as Query_userById } from './user/resolvers/Query/userById';
import    { createUser as Mutation_createUser } from './user/resolvers/Mutation/createUser';
import    { User } from './user/resolvers/User';
    export const resolvers: Resolvers = {
      Query: { userById: Query_userById },
      Mutation: { createUser: Mutation_createUser },
      
      User: User
    }