import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  

  for(let i = 0; i < 50; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.name.fullName(),  
        email: faker.internet.email(),
        posts: {
          create: {
            title: faker.lorem.sentence(),
            content: faker.lorem.sentence(), 
          },
        },
      },
    });
  }
  
  return new Response('Hello, Next.js!')
}
