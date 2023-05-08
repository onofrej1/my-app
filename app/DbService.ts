import { PrismaClient } from '@prisma/client'
import type { Prisma } from '@prisma/client'

const prisma = new PrismaClient()

type Operation =
  | 'findFirst'
  | 'findUnique'
  | 'findMany'
  | 'create'
  | 'createMany'
  | 'update'
  | 'updateMany'
  | 'delete'
  | 'deleteMany'
  | 'count' 

export abstract class DbService<
  Db extends { [Key in Operation]: (data: any) => unknown },
  Args extends { [K in Operation]: unknown },
  Return extends { [K in Operation]: unknown }
> {
  constructor(protected db: Db) {}

  findFirst(data?: Args['findFirst']): Return['findFirst'] {
    return this.db.findFirst(data)
  }

  findUnique(data: Args['findUnique']): Return['findUnique'] {
    return this.db.findUnique(data)
  }

  findMany(data?: Args['findMany']): Return['findMany'] {
    return this.db.findMany(data)
  }

  create(data: Args['create']): Return['create'] {
    return this.db.create(data)
  }

  createMany(data: Args['createMany']): Return['createMany'] {
    return this.db.createMany(data)
  }

  update(data: Args['update']): Return['update'] {
    return this.db.update(data)
  }

  updateMany(data: Args['updateMany']): Return['updateMany'] {
    return this.db.updateMany(data)
  }

  delete(data: Args['delete']): Return['delete'] {
    return this.db.delete(data)
  }

  deleteMany(data?: Args['deleteMany']): Return['deleteMany'] {
    return this.db.deleteMany(data)
  }

  count(data?: Args['count']): Return['count'] {
    return this.db.count(data)
  }
}

type DelegateArgs<T> = {
  [Key in keyof T]: T[Key] extends (args: infer A) => unknown ? A : never
}

type DelegateReturnTypes<T> = {
  [Key in keyof T]: T[Key] extends (...args: any[]) => any ? ReturnType<T[Key]> : never
}

type UserDelegate = Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

export class UserModel extends DbService<UserDelegate, DelegateArgs<UserDelegate>, DelegateReturnTypes<UserDelegate>> {
  constructor() {
    super(prisma.user)
  }
}

type PostDelegate = Prisma.PostDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

export class PostModel extends DbService<PostDelegate, DelegateArgs<PostDelegate>, DelegateReturnTypes<PostDelegate>> {
  constructor() {
    super(prisma.post)
  }
}
const User = new UserModel()

export async function main() {
  const userList = await User.findMany();
  return userList;
}