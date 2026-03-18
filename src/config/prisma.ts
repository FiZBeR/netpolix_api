import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import 'dotenv/config';

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST as string,
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    connectionLimit: 5,
    allowPublicKeyRetrieval: true
  });

const prisma = new PrismaClient({ adapter });

export default prisma;