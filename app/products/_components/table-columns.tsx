"use client"

import { Badge } from "@/app/_components/ui/badge"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon, ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu"
import { Button } from "@/app/_components/ui/button"

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog"
import DeleteProductDialogContent from "./delete-dialog-content"
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog"
import UpsertProductsDialogContent from "./upsert-product-content"
import { useState } from "react"



const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque"
  }

  return "Fora do estoque"
}

export const productsTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
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
    cell: (row) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)
      const product = row.row.original
      return (
        <AlertDialog>
          <Dialog open={editDialogIsOpen} onOpenChange={setEditDialogIsOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}>
                  <MoreHorizontalIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-1.5" onClick={() => navigator.clipboard.writeText(product.id)}>
                  <ClipboardCopyIcon size={16} />
                  Copiar ID
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="gap-1.5">
                    <EditIcon size={16} />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem className="gap-1.5">
                  <AlertDialogTrigger asChild>
                    <Button className="gap-1.5">
                      <TrashIcon size={16} />
                      Deletar
                    </Button>
                  </AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UpsertProductsDialogContent defaultValues={{
              id: product.id,
              name: product.name,
              price: Number(product.price),
              stock: product.stock
            }}
              onSuccess={() => setEditDialogIsOpen(false)}
            />
            <DeleteProductDialogContent productId={product.id} />
          </Dialog>
        </AlertDialog>
      )
    }
  }
]
