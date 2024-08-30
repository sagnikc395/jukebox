import { PrismaClient } from "@prisma/client";

//auto gen the right types from the schema
export const prismaClient = new PrismaClient();
//better apporach : introduce a singleton here !
