import { NextResponse } from "next/server";
import _ from "lodash";
import { buildRelationQuery } from "services/utils";
const db = require("models/index");

const resources: Record<string, any> = {
  users: db.User,
  posts: db.Post,
  categories: db.Category,
};

const querystr = require("node:querystring");

export async function GET(request: Request, { params }: any) {
  const resource = params.resource;

  const q = request.url?.split("?");
  const qs = q?.length === 2 ? q[1] : "";

  const queryStr = querystr.parse(qs);

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

  if (page && take) {
    page = Number(page);
    take = Number(take);
    skip = page && page > 0 ? take * (page + 1) - take : skip;
  }

  const model = resources[resource];

  order = order instanceof Array ? order : [order];
  order = order.filter(Boolean).reduce((ord: any[], value: string) => {
    let column = value.startsWith("-") ? value.substring(1) : value;
    const direction = value.startsWith("-") ? "desc" : "asc";
    //obj = _.merge(obj, buildRelationQuery(column, direction));
    const orderBy = [column, direction];
    ord.push(orderBy);
    return ord;
  }, []);

  const relations = buildRelationQuery(include, true);

  let where = {};
  Object.keys(query).forEach((key) => {
    let val = query[key];
    let value;
    let [searchKey, oper] = key.split("__");
    if (oper) {
      val = oper === "contains" ? `%${val}%` : value;
      value = val;
    } else if (key.includes(",")) {
      /* TODO search with 'OR' operator */
    } else {
      value = val;
    }
    where = _.merge(where, buildRelationQuery(searchKey + "." + oper, value));
  });

  const data = await model.findAll({
    atributes: select || [], //: selectQuery !== undefined ? selectQuery : undefined,
    where,
    offset: skip !== undefined ? Number(skip) : undefined,
    limit: take !== undefined ? Number(take) : undefined,
    order,
    //include: include || [],
    //include: Object.keys(relations).length > 0 ? relations : undefined,
  });

  const count = await model.count({
    where,
  });

  return NextResponse.json({ count, results: data });
}

export async function POST(request: Request, { params }: any) {
  const data = await request.json();
  const resource = params.resource;
  const entity = resources[resource];

  const newEntity = await entity.create(data);

  return NextResponse.json(newEntity);
}
