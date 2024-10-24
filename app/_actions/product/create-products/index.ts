"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { createProductsSchema, CreateProductsSchema } from "./schema";

export const createProduct = async (data: CreateProductsSchema) => {
  createProductsSchema.parse(data);
  await new Promise((resolve) => setTimeout(resolve, 5000));

  await db.product.create({
    data,
  });
  revalidatePath("/products");
};
