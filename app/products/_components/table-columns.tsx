"use client"

import { Badge } from "@/app/_components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon } from "lucide-react"

import TableDropdownMenu from "./table-dropdown-menu"
import { ProductDto } from "@/app/_data-acess/product/get-products"

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque"
  }

  return "Fora do estoque"
}

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
    cell: (row) => {
      const product = row.row.original
      const label = getStatusLabel(product.status)
      return (
        <Badge variant={label === "Em estoque" ? "default" : "outline"} className="gap-2">
          <CircleIcon className={`${label === "Em estoque" ? "fill-primary-foreground" : "fill-destructive-foreground"}`} size={14} />
          {label}
        </Badge>
      )
    }
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => <TableDropdownMenu product={row.row.original} />
  },
]
