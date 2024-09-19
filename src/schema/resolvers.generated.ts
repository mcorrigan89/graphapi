/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { me as Query_me } from './user/resolvers/Query/me';
import    { userById as Query_userById } from './user/resolvers/Query/userById';
import    { authenticateWithGoogleCode as Mutation_authenticateWithGoogleCode } from './user/resolvers/Mutation/authenticateWithGoogleCode';
import    { authenticateWithPassword as Mutation_authenticateWithPassword } from './user/resolvers/Mutation/authenticateWithPassword';
import    { createUser as Mutation_createUser } from './user/resolvers/Mutation/createUser';
import    { EmailUnavailable } from './user/resolvers/EmailUnavailable';
import    { InvalidCredentials } from './user/resolvers/InvalidCredentials';
import    { UnknownError } from './base/resolvers/UnknownError';
import    { User } from './user/resolvers/User';
import    { UserAlreadyCreated } from './user/resolvers/UserAlreadyCreated';
import    { UserNotFound } from './user/resolvers/UserNotFound';
import    { UserSession } from './user/resolvers/UserSession';
    export const resolvers: Resolvers = {
      Query: { me: Query_me,userById: Query_userById },
      Mutation: { authenticateWithGoogleCode: Mutation_authenticateWithGoogleCode,authenticateWithPassword: Mutation_authenticateWithPassword,createUser: Mutation_createUser },
      
      EmailUnavailable: EmailUnavailable,
InvalidCredentials: InvalidCredentials,
UnknownError: UnknownError,
User: User,
UserAlreadyCreated: UserAlreadyCreated,
UserNotFound: UserNotFound,
UserSession: UserSession
    }