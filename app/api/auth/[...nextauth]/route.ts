import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import { Sequelize } from "sequelize";

const sequelize: any = new Sequelize("myapp", "test", "test", {
  host: "localhost",
  dialect: "mysql",
});

export const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  adapter: SequelizeAdapter(sequelize),
};

// Calling sync() is not recommended in production
//sequelize.sync();

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
