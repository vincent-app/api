import { consola } from "consola";
import { PrismaClient, Prisma } from "@prisma/client";

import app from "./app";

/**
 * Load Prsima Client and connect to Prisma Server if failed to connect, throw error.
 */
const prisma = new PrismaClient();

prisma
  .$connect()
  .then(async () => {
    await prisma.$disconnect();
    app.listen(app.get("port"), () => {
      /**
       *  Log infomation after everything is started.
       */
      if (process.env.NODE_ENV !== "test") {
        consola.log("----------------------------------------");
        consola.info(`Environment: ${app.get("env")}`);
        consola.info(`App URL: http://${app.get("host")}:${app.get("port")}`);
        consola.info(`Prisma: Connected`);
        consola.log("----------------------------------------");
      }
    });
  })
  .catch(async (e: any) => {
    console.error(e);
    process.exit(1);
  });
