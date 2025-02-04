/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as IndexImport } from './routes/index'
import { Route as ProfileIndexImport } from './routes/profile/index'
import { Route as PostsIndexImport } from './routes/posts/index'
import { Route as ProfileUserIdImport } from './routes/profile/$userId'
import { Route as PostsAddImport } from './routes/posts/add'
import { Route as PostsPostIdImport } from './routes/posts/$postId'
import { Route as PostsEditPostIdImport } from './routes/posts/edit/$postId'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileIndexRoute = ProfileIndexImport.update({
  id: '/profile/',
  path: '/profile/',
  getParentRoute: () => rootRoute,
} as any)

const PostsIndexRoute = PostsIndexImport.update({
  id: '/posts/',
  path: '/posts/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileUserIdRoute = ProfileUserIdImport.update({
  id: '/profile/$userId',
  path: '/profile/$userId',
  getParentRoute: () => rootRoute,
} as any)

const PostsAddRoute = PostsAddImport.update({
  id: '/posts/add',
  path: '/posts/add',
  getParentRoute: () => rootRoute,
} as any)

const PostsPostIdRoute = PostsPostIdImport.update({
  id: '/posts/$postId',
  path: '/posts/$postId',
  getParentRoute: () => rootRoute,
} as any)

const PostsEditPostIdRoute = PostsEditPostIdImport.update({
  id: '/posts/edit/$postId',
  path: '/posts/edit/$postId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/posts/$postId': {
      id: '/posts/$postId'
      path: '/posts/$postId'
      fullPath: '/posts/$postId'
      preLoaderRoute: typeof PostsPostIdImport
      parentRoute: typeof rootRoute
    }
    '/posts/add': {
      id: '/posts/add'
      path: '/posts/add'
      fullPath: '/posts/add'
      preLoaderRoute: typeof PostsAddImport
      parentRoute: typeof rootRoute
    }
    '/profile/$userId': {
      id: '/profile/$userId'
      path: '/profile/$userId'
      fullPath: '/profile/$userId'
      preLoaderRoute: typeof ProfileUserIdImport
      parentRoute: typeof rootRoute
    }
    '/posts/': {
      id: '/posts/'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof PostsIndexImport
      parentRoute: typeof rootRoute
    }
    '/profile/': {
      id: '/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileIndexImport
      parentRoute: typeof rootRoute
    }
    '/posts/edit/$postId': {
      id: '/posts/edit/$postId'
      path: '/posts/edit/$postId'
      fullPath: '/posts/edit/$postId'
      preLoaderRoute: typeof PostsEditPostIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/posts/$postId': typeof PostsPostIdRoute
  '/posts/add': typeof PostsAddRoute
  '/profile/$userId': typeof ProfileUserIdRoute
  '/posts': typeof PostsIndexRoute
  '/profile': typeof ProfileIndexRoute
  '/posts/edit/$postId': typeof PostsEditPostIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/posts/$postId': typeof PostsPostIdRoute
  '/posts/add': typeof PostsAddRoute
  '/profile/$userId': typeof ProfileUserIdRoute
  '/posts': typeof PostsIndexRoute
  '/profile': typeof ProfileIndexRoute
  '/posts/edit/$postId': typeof PostsEditPostIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/posts/$postId': typeof PostsPostIdRoute
  '/posts/add': typeof PostsAddRoute
  '/profile/$userId': typeof ProfileUserIdRoute
  '/posts/': typeof PostsIndexRoute
  '/profile/': typeof ProfileIndexRoute
  '/posts/edit/$postId': typeof PostsEditPostIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/register'
    | '/posts/$postId'
    | '/posts/add'
    | '/profile/$userId'
    | '/posts'
    | '/profile'
    | '/posts/edit/$postId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/register'
    | '/posts/$postId'
    | '/posts/add'
    | '/profile/$userId'
    | '/posts'
    | '/profile'
    | '/posts/edit/$postId'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/register'
    | '/posts/$postId'
    | '/posts/add'
    | '/profile/$userId'
    | '/posts/'
    | '/profile/'
    | '/posts/edit/$postId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
  PostsPostIdRoute: typeof PostsPostIdRoute
  PostsAddRoute: typeof PostsAddRoute
  ProfileUserIdRoute: typeof ProfileUserIdRoute
  PostsIndexRoute: typeof PostsIndexRoute
  ProfileIndexRoute: typeof ProfileIndexRoute
  PostsEditPostIdRoute: typeof PostsEditPostIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
  PostsPostIdRoute: PostsPostIdRoute,
  PostsAddRoute: PostsAddRoute,
  ProfileUserIdRoute: ProfileUserIdRoute,
  PostsIndexRoute: PostsIndexRoute,
  ProfileIndexRoute: ProfileIndexRoute,
  PostsEditPostIdRoute: PostsEditPostIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/register",
        "/posts/$postId",
        "/posts/add",
        "/profile/$userId",
        "/posts/",
        "/profile/",
        "/posts/edit/$postId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/posts/$postId": {
      "filePath": "posts/$postId.tsx"
    },
    "/posts/add": {
      "filePath": "posts/add.tsx"
    },
    "/profile/$userId": {
      "filePath": "profile/$userId.ts"
    },
    "/posts/": {
      "filePath": "posts/index.tsx"
    },
    "/profile/": {
      "filePath": "profile/index.ts"
    },
    "/posts/edit/$postId": {
      "filePath": "posts/edit/$postId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
