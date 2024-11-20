"use client"

import { ColumnDef } from "@tanstack/react-table"

import TableDropdownMenu from "./table-dropdown-menu"
import { ProductDto } from "@/app/_data-acess/product/get-products"
import ProductsStatusBadge from "@/app/_components/products-status-badge"

export const productsTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: (row) => {
      const product = row.row.original
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(Number(product.price))
    }
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original: product } }) => {
      return (
        <ProductsStatusBadge status={product.status} />
      )
    }
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => <TableDropdownMenu product={row.row.original} />
  },
]
