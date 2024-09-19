import { GraphQLResolveInfo } from 'graphql';
import { ServerContext } from '@/server';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthenticateWithGoogleCodePayload = {
  code: Scalars['String']['input'];
};

export type AuthenticateWithPasswordPayload = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateUserPayload = {
  email: Scalars['String']['input'];
  familyName?: InputMaybe<Scalars['String']['input']>;
  givenName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type CreateUserResult = EmailUnavailable | UnknownError | User | UserAlreadyCreated;

export type EmailUnavailable = GraphError & {
  __typename?: 'EmailUnavailable';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type GraphError = {
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type InvalidCredentials = GraphError & {
  __typename?: 'InvalidCredentials';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateWithGoogleCode: UserSessionResult;
  authenticateWithPassword: UserSessionResult;
  createUser: CreateUserResult;
};


export type MutationauthenticateWithGoogleCodeArgs = {
  payload: AuthenticateWithGoogleCodePayload;
};


export type MutationauthenticateWithPasswordArgs = {
  payload: AuthenticateWithPasswordPayload;
};


export type MutationcreateUserArgs = {
  payload: CreateUserPayload;
};

export type Query = {
  __typename?: 'Query';
  me: UserResult;
  userById: UserResult;
};


export type QueryuserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type UnknownError = GraphError & {
  __typename?: 'UnknownError';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  familyName?: Maybe<Scalars['String']['output']>;
  givenName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type UserAlreadyCreated = GraphError & {
  __typename?: 'UserAlreadyCreated';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type UserNotFound = GraphError & {
  __typename?: 'UserNotFound';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type UserResult = UnknownError | User | UserNotFound;

export type UserSession = {
  __typename?: 'UserSession';
  expiresAt: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type UserSessionResult = InvalidCredentials | UnknownError | UserNotFound | UserSession;



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  CreateUserResult: ( EmailUnavailable & { __typename: 'EmailUnavailable' } ) | ( UnknownError & { __typename: 'UnknownError' } ) | ( User & { __typename: 'User' } ) | ( UserAlreadyCreated & { __typename: 'UserAlreadyCreated' } );
  UserResult: ( UnknownError & { __typename: 'UnknownError' } ) | ( User & { __typename: 'User' } ) | ( UserNotFound & { __typename: 'UserNotFound' } );
  UserSessionResult: ( InvalidCredentials & { __typename: 'InvalidCredentials' } ) | ( UnknownError & { __typename: 'UnknownError' } ) | ( UserNotFound & { __typename: 'UserNotFound' } ) | ( UserSession & { __typename: 'UserSession' } );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  GraphError: ( EmailUnavailable & { __typename: 'EmailUnavailable' } ) | ( InvalidCredentials & { __typename: 'InvalidCredentials' } ) | ( UnknownError & { __typename: 'UnknownError' } ) | ( UserAlreadyCreated & { __typename: 'UserAlreadyCreated' } ) | ( UserNotFound & { __typename: 'UserNotFound' } );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthenticateWithGoogleCodePayload: AuthenticateWithGoogleCodePayload;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AuthenticateWithPasswordPayload: AuthenticateWithPasswordPayload;
  CreateUserPayload: CreateUserPayload;
  CreateUserResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreateUserResult']>;
  EmailUnavailable: ResolverTypeWrapper<EmailUnavailable>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  GraphError: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['GraphError']>;
  InvalidCredentials: ResolverTypeWrapper<InvalidCredentials>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  UnknownError: ResolverTypeWrapper<UnknownError>;
  User: ResolverTypeWrapper<User>;
  UserAlreadyCreated: ResolverTypeWrapper<UserAlreadyCreated>;
  UserNotFound: ResolverTypeWrapper<UserNotFound>;
  UserResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UserResult']>;
  UserSession: ResolverTypeWrapper<UserSession>;
  UserSessionResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UserSessionResult']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthenticateWithGoogleCodePayload: AuthenticateWithGoogleCodePayload;
  String: Scalars['String']['output'];
  AuthenticateWithPasswordPayload: AuthenticateWithPasswordPayload;
  CreateUserPayload: CreateUserPayload;
  CreateUserResult: ResolversUnionTypes<ResolversParentTypes>['CreateUserResult'];
  EmailUnavailable: EmailUnavailable;
  Int: Scalars['Int']['output'];
  GraphError: ResolversInterfaceTypes<ResolversParentTypes>['GraphError'];
  InvalidCredentials: InvalidCredentials;
  Mutation: {};
  Query: {};
  ID: Scalars['ID']['output'];
  UnknownError: UnknownError;
  User: User;
  UserAlreadyCreated: UserAlreadyCreated;
  UserNotFound: UserNotFound;
  UserResult: ResolversUnionTypes<ResolversParentTypes>['UserResult'];
  UserSession: UserSession;
  UserSessionResult: ResolversUnionTypes<ResolversParentTypes>['UserSessionResult'];
  Boolean: Scalars['Boolean']['output'];
};

export type CreateUserResultResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['CreateUserResult'] = ResolversParentTypes['CreateUserResult']> = {
  __resolveType?: TypeResolveFn<'EmailUnavailable' | 'UnknownError' | 'User' | 'UserAlreadyCreated', ParentType, ContextType>;
};

export type EmailUnavailableResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['EmailUnavailable'] = ResolversParentTypes['EmailUnavailable']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphErrorResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['GraphError'] = ResolversParentTypes['GraphError']> = {
  __resolveType?: TypeResolveFn<'EmailUnavailable' | 'InvalidCredentials' | 'UnknownError' | 'UserAlreadyCreated' | 'UserNotFound', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type InvalidCredentialsResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['InvalidCredentials'] = ResolversParentTypes['InvalidCredentials']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  authenticateWithGoogleCode?: Resolver<ResolversTypes['UserSessionResult'], ParentType, ContextType, RequireFields<MutationauthenticateWithGoogleCodeArgs, 'payload'>>;
  authenticateWithPassword?: Resolver<ResolversTypes['UserSessionResult'], ParentType, ContextType, RequireFields<MutationauthenticateWithPasswordArgs, 'payload'>>;
  createUser?: Resolver<ResolversTypes['CreateUserResult'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'payload'>>;
};

export type QueryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType>;
  userById?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<QueryuserByIdArgs, 'id'>>;
};

export type UnknownErrorResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['UnknownError'] = ResolversParentTypes['UnknownError']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  givenName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAlreadyCreatedResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['UserAlreadyCreated'] = ResolversParentTypes['UserAlreadyCreated']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserNotFoundResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['UserNotFound'] = ResolversParentTypes['UserNotFound']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = {
  __resolveType?: TypeResolveFn<'UnknownError' | 'User' | 'UserNotFound', ParentType, ContextType>;
};

export type UserSessionResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['UserSession'] = ResolversParentTypes['UserSession']> = {
  expiresAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSessionResultResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['UserSessionResult'] = ResolversParentTypes['UserSessionResult']> = {
  __resolveType?: TypeResolveFn<'InvalidCredentials' | 'UnknownError' | 'UserNotFound' | 'UserSession', ParentType, ContextType>;
};

export type Resolvers<ContextType = ServerContext> = {
  CreateUserResult?: CreateUserResultResolvers<ContextType>;
  EmailUnavailable?: EmailUnavailableResolvers<ContextType>;
  GraphError?: GraphErrorResolvers<ContextType>;
  InvalidCredentials?: InvalidCredentialsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UnknownError?: UnknownErrorResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAlreadyCreated?: UserAlreadyCreatedResolvers<ContextType>;
  UserNotFound?: UserNotFoundResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
  UserSession?: UserSessionResolvers<ContextType>;
  UserSessionResult?: UserSessionResultResolvers<ContextType>;
};

