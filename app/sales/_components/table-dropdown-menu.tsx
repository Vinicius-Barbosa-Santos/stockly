import { Button } from "@/app/_components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { deleteSale } from "@/app/_actions/sale/delete-sale";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSheetContent from "./upsert-sheet-content";
import { useState } from "react";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { ProductDto } from "@/app/_data-acess/product/get-products";
import { SaleDto } from "@/app/_data-acess/sale/get-sales";

interface SalesTableDropdownMenu {
    sale: Pick<SaleDto, "id" | "saleProducts">,
    productsOptions: ComboboxOption[],
    products: ProductDto[]
}

const SalesTableDropdownMenu = ({ sale, products, productsOptions }: SalesTableDropdownMenu) => {

    const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false)

    const { execute } = useAction(deleteSale, {
        onSuccess: () => {
            toast.success("Venda deletada com sucesso.")
        },
        onError: () => {
            toast.error("Erro ao deletar a venda")
        }
    })

    const handleCopyToClipboardClick = () => {
        navigator.clipboard.writeText(sale.id)
        toast.success("ID copiado para a área de transferência.")
    }

    const handleConfirmDeleteClick = () => execute({ id: sale.id })

    return (
        <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
            <AlertDialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"}>
                            <MoreHorizontalIcon size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-1.5" onClick={handleCopyToClipboardClick}>
                            <ClipboardCopyIcon size={16} />
                            Copiar ID
                        </DropdownMenuItem>
                        <SheetTrigger asChild>
                            <DropdownMenuItem className="gap-1.5">
                                <EditIcon size={16} />
                                Editar
                            </DropdownMenuItem>
                        </SheetTrigger>
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
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Você deseja realmente excluir?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Você está prestes a excluir esta venda. Esta ação não pode ser desfeita. Deseja Continuar?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDeleteClick}>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <UpsertSheetContent saleId={sale.id} defaultSelectedProducts={sale.saleProducts.map(saleProduct => ({
                id: saleProduct.productId,
                quantity: saleProduct.quantity,
                name: saleProduct.productName,
                price: saleProduct.unitPrice,
            }))} productOptions={productsOptions} products={products} onSubmitSuccess={() => setUpsertSheetIsOpen} />
        </Sheet>
    );
}

export default SalesTableDropdownMenu;