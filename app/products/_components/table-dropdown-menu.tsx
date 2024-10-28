import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import UpsertProductsDialogContent from "./upsert-product-content";
import DeleteProductDialogContent from "./delete-dialog-content";

interface TableDropdownMenuProps {
    product: Product
}

const TableDropdownMenu = ({ product }: TableDropdownMenuProps) => {
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)
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
    );
}

export default TableDropdownMenu;