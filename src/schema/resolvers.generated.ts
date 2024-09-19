/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { userById as Query_userById } from './user/resolvers/Query/userById';
import    { createUser as Mutation_createUser } from './user/resolvers/Mutation/createUser';
import    { EmailUnavailable } from './user/resolvers/EmailUnavailable';
import    { UnknownError } from './base/resolvers/UnknownError';
import    { User } from './user/resolvers/User';
import    { UserNotFound } from './user/resolvers/UserNotFound';
    export const resolvers: Resolvers = {
      Query: { userById: Query_userById },
      Mutation: { createUser: Mutation_createUser },
      
      EmailUnavailable: EmailUnavailable,
UnknownError: UnknownError,
User: User,
UserNotFound: UserNotFound
    }