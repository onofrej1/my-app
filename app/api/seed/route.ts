import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";
const db = require("models/index");

export async function GET(request: Request, { params }: any) {
  for (let i = 0; i < 10; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    await db.User.create({ firstName, lastName, email });
  }

  const category = await db.Category.create({ title: "First category" });

  for (let i = 0; i < 10; i++) {
    const title = faker.lorem.words();
    const body = faker.lorem.sentence();
    await db.Post.create({ title, body, CategoryId: category.id });
  }

  return NextResponse.json({ result: "ok" });
}
