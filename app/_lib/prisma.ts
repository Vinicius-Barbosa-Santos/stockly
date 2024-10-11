/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";

const createPrismaClient = () => {
  return new PrismaClient().$extends({
    result: {
      product: {
        status: {
          needs: { stock: true },
          compute(product) {
            if (product.stock <= 0) {
              return "OUT_OF_STOCK";
            }
            return "IN_STOCK";
          },
        },
      },
    },
  });
};

// Declaração global para armazenar a instância do Prisma no ambiente de desenvolvimento
declare global {
  // Permite reatribuir a variável global
  var cachedPrisma: ReturnType<typeof createPrismaClient> | undefined;
}

let prisma: ReturnType<typeof createPrismaClient>;

// Se o ambiente for produção, cria uma nova instância do Prisma
if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  // No ambiente de desenvolvimento, reutiliza a instância existente para evitar sobrecarga
  if (!global.cachedPrisma) {
    global.cachedPrisma = createPrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
