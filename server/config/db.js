import { PrismaClient } from "@prisma/client";
import { enhance } from "@zenstackhq/runtime";

const prisma = new PrismaClient();
export const db = enhance(prisma);

