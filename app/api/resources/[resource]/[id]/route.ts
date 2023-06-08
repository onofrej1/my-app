import { NextResponse } from "next/server";
import _ from "lodash";
//import { resources } from "prisma/models";
import { buildRelationQuery } from "services/utils";
const db = require("models/index");

const querystr = require("node:querystring");
const resources: Record<string, any> = {
  users: db.User,
  posts: db.Post,
};

export async function GET(request: Request, { params }: any) {
  const resource = params.resource;

  const q = request.url?.split("?");
  const qs = q?.length === 2 ? q[1] : "";

  const queryStr = querystr.parse(qs);
  const { include } = queryStr;

  const model = resources[resource];

  const relations = buildRelationQuery(include, true);

  const data = await model.findByPk(Number(params.id));
  //include: Object.keys(relations).length > 0 ? relations : undefined,
  //});

  return NextResponse.json(data);
}

export async function PATCH(request: Request, { params }: any) {
  const data = await request.json();
  const resource = params.resource;
  const entity = resources[resource];

  const row = await entity.update(data, {
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(row);
}
