import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient, User } from "@prisma/client";
import _ from "lodash";
import queryString from "query-string";
import { DbService, PostModel, UserModel, main } from "services/app/DbService";

const querystr = require("node:querystring");

//const queryString = require('query-string');
const prisma = new PrismaClient();

type Entity =
  | Prisma.UserDelegate<
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >
  | Prisma.PostDelegate<
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >;

const entities: any = {
  users: prisma.user,
  posts: prisma.post,
};

const resources: Record<string, UserModel | PostModel> = {
  posts: new PostModel(),
  users: new UserModel(),
};

const buildRelationQuery = (key: string, value: any) => {
  if (!key) return {};
  let arr: string[] = [];
  arr = arr.concat(key);
  const relations = arr.reduce((result, v) => {
    if (v.includes(".")) {
      const nestedRelations = v
        .split(".")
        .reverse()
        .reduce(
          (res, key) => ({ [key]: Object.keys(res).length > 0 ? res : value }),
          {}
        );
      return _.merge(result, nestedRelations);
    }
    return _.merge(result, { [v]: value });
  }, {});
  return relations;
};

export async function GET(request: Request, { params }: any) {
  console.log(params);
  const resource = params.resource;
  const entity = entities[resource];

  const q = request.url?.split("?");
  const qs = q?.length === 2 ? q[1] : "";

  const queryStr = querystr.parse(qs);
  console.log(queryStr);
  const { include } = queryStr;

  const m = resources[resource];

  const relations = buildRelationQuery(include, true);
  console.log(relations);

  const data = await m.findFirst({
    where: {
      id: Number(params.id),
    },
    include: Object.keys(relations).length > 0 ? relations : undefined,
  });

  return NextResponse.json(data);
}
