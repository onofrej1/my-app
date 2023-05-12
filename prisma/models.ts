import { Prisma, PrismaClient } from "@prisma/client";
import { DbService, DelegateArgs, DelegateReturnTypes } from "./dbService";

const prisma = new PrismaClient();

type UserDelegate = Prisma.UserDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;

export class UserModel extends DbService<
  UserDelegate,
  DelegateArgs<UserDelegate>,
  DelegateReturnTypes<UserDelegate>
> {
  constructor() {
    super(prisma.user);
  }
}

type PostDelegate = Prisma.PostDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;

export class PostModel extends DbService<
  PostDelegate,
  DelegateArgs<PostDelegate>,
  DelegateReturnTypes<PostDelegate>
> {
  constructor() {
    super(prisma.post);
  }
}

export const resources: Record<string, UserModel | PostModel> = {
  posts: new PostModel(),
  users: new UserModel(),
};
