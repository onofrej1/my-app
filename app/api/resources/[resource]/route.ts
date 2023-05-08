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
  //const { resource } = router.query;
  //console.log(resource);
  const q = request.url?.split("?");
  const qs = q?.length === 2 ? q[1] : "";

  let parsed = queryString.parse(qs, {
    arrayFormat: "comma",
    parseNumbers: true,
  });
  //let { skip, take, select, page, order, include, search, searchFields, ...query } = parsed;
  const queryStr = querystr.parse(qs);
  console.log(parsed);
  console.log(queryStr);
  let {
    skip,
    take,
    select,
    page,
    order,
    include,
    search,
    searchFields,
    ...query
  } = queryStr;
  page = Number(page) || 0;
  take = Number(take) || 10;
  skip = page && page > 0 ? take * (page + 1) - take : skip;

  const m = resources[resource];

  let selectQuery = {};
  if (select && Array.isArray(select)) {
    selectQuery = select.reduce((a, v) => ({ ...a, [v!]: true }), {});
  }
  console.log(order);

  order = order instanceof Array ? order : [order];
  order = order.filter(Boolean).reduce((obj: any, value: string) => {
    let column = value.startsWith("-") ? value.substring(1) : value;
    const direction = value.startsWith("-") ? "desc" : "asc";
    obj = _.merge(obj, buildRelationQuery(column, direction));
    return obj;
  }, {});

  console.log(include);
  const relations = buildRelationQuery(include, true);
  //console.log(relations);

  /*const operators = ['contains', 'startsWith', 'endsWith', 'equals'].reduce((obj: any, op) => {
      let key = op.toLowerCase();
      obj[key] = op;
      return obj;
    }, {});*/

  let where = {};
  Object.keys(query).forEach((key) => {
    let val = query[key];
    let value;
    let [searchKey, oper] = key.split("__");
    if (oper) {
      val = oper === "contains" ? `%${val}%` : value;
      if (oper.startsWith("!")) {
        //value = Not(operators[oper.substring(1)](val));
      } else {
        value = val;
      }
    } else if (key.includes(",")) {
      /* TODO search with 'OR' operator */
    } else {
      value = val;
    }
    where = _.merge(where, buildRelationQuery(searchKey + "." + oper, value));
  });
  console.log(where);
  const r = await m.findMany({
    //select: selectQuery,
    where,
    skip: Number(skip) || 0,
    take: Number(take) || 10,
    orderBy: order,
    include: relations,
  });

  const count = await m.count({
    //select: selectQuery,
    where,
  });

  //console.log(r);
  const d = request.body;

  /*const newUser = await prisma.user.create({
        data: {
            name: 'a',
            email: 'b',
        },
      });*/

  /*await m.create({
        data: query,
      });*/

  //const users = await prisma.user.findMany();
  //console.log(await main());
  //console.log(users);

  return NextResponse.json({ count, results: r });
}