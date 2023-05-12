import { NextResponse } from "next/server";
import _ from "lodash";
import { resources } from "prisma/models";
import { buildRelationQuery } from "services/utils";

const querystr = require("node:querystring");

export async function GET(request: Request, { params }: any) {
  const resource = params.resource;

  const q = request.url?.split("?");
  const qs = q?.length === 2 ? q[1] : "";

  const queryStr = querystr.parse(qs);
  const { include } = queryStr;

  const model = resources[resource];

  const relations = buildRelationQuery(include, true);

  const data = await model.findFirst({
    where: {
      id: Number(params.id),
    },
    include: Object.keys(relations).length > 0 ? relations : undefined,
  });

  return NextResponse.json(data);
}

export async function PATCH(request: Request, { params }: any) {
  const data = await request.json();
  const resource = params.resource;
  const entity = resources[resource];

  const newUser = await entity.update({
    where: {
      id: Number(params.id),
    },
    data,
  });

  return NextResponse.json(newUser);
}
