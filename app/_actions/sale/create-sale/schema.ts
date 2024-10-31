import * as z from "zod";

export const createSaleSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type createSaleSchema = z.infer<typeof createSaleSchema>;
