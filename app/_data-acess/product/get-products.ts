import "server-only";

import { db } from "@/app/_lib/prisma";
import { unstable_cache } from "next/cache";

export type ProductStatusDto = "IN_STOCK" | "OUT_OF_STOCK";

export interface ProductDto {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  status: ProductStatusDto;
}

export const getProducts = async (): Promise<ProductDto[]> => {
  const products = await db.product.findMany({});
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    stock: product.stock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};

export const cachedGetProducts = unstable_cache(getProducts, ["get-products"], {
  tags: ["get-products"],
  revalidate: 10,
});
