"use client"

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks"

import * as z from "zod";
import UpsertSaleTableDropdownMenu from "./upsert-table-dropdown-menu";
import { upsertSale } from "@/app/_actions/sale/upsert-sale";
import { toast } from "sonner";
import { flattenValidationErrors } from "next-safe-action";
import { ProductDto } from "@/app/_data-acess/product/get-products";

const formSchema = z.object({
    productId: z.string().uuid({
        message: "O produto é obrigatório"
    }),
    quantity: z.coerce.number().int().positive()
})

type FormSchema = z.infer<typeof formSchema>

interface SelectedProduct {
    id: string,
    name: string,
    price: number,
    quantity: number
}

interface UpsertSheetContentProps {
    saleId?: string,
    products: ProductDto[],
    productOptions: ComboboxOption[],
    onSubmitSuccess: () => void,
    defaultSelectedProducts?: SelectedProduct[]
}

const UpsertSheetContent = ({ saleId, products, productOptions, onSubmitSuccess, defaultSelectedProducts }: UpsertSheetContentProps) => {
    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(defaultSelectedProducts ?? [])

    const { execute: executeUpsertSale } = useAction(upsertSale, {
        onError: ({ error: { validationErrors, serverError } }) => {
            const flattenedErros = flattenValidationErrors(validationErrors)
            toast.error(serverError ?? flattenedErros.formErrors[0])

        },
        onSuccess: () => {
            toast.success("Venda Realizada com sucesso.")
            onSubmitSuccess()
        }
    })

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: "",
            quantity: 1,
        }
    })

    const onSubmit = (data: FormSchema) => {
        const selectedProduct = products.find(product => product.id === data.productId)

        if (!selectedProduct) return

        setSelectedProducts((currencyProducts) => {
            const existingProduct = currencyProducts.find((product) => product.id === selectedProduct.id)

            if (existingProduct) {
                form.reset()

                return currencyProducts.map(product => {
                    if (product.id === selectedProduct.id) {
                        return {
                            ...existingProduct,
                            quantity: existingProduct.quantity + data.quantity
                        }
                    }

                    return product
                })
            }

            form.reset()

            return [...currencyProducts, { ...selectedProduct, price: Number(selectedProduct.price), quantity: data.quantity }]
        })
    }

    const productsTotal = useMemo(() => {
        return selectedProducts.reduce((acc, product) => {
            return acc + product.price * product.quantity
        }, 0)
    }, [selectedProducts])

    const onDelete = (productId: string) => {
        setSelectedProducts((currentProducts) => {
            return currentProducts.filter((product) => product.id !== productId)
        })
    }

    const onSubmitSale = async () => {
        executeUpsertSale({
            id: saleId,
            products: selectedProducts.map(product => ({
                id: product.id,
                quantity: product.quantity
            }))
        })
    }

    return (
        <SheetContent className="!max-w-[700px]">
            <SheetHeader>
                <SheetTitle>Nova Venda</SheetTitle>
                <SheetDescription>
                    Insira as informações da venda abaixo.
                </SheetDescription>
            </SheetHeader>

            <Form {...form}>
                <form className="py-6 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="productId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Produto</FormLabel>
                                <FormControl>
                                    <Combobox options={productOptions} placeholder="Selecione um produto" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantidade</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Digite a quantidade" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="gap-2 w-full" variant={"secondary"}>
                        <PlusIcon size={20} />
                        Adicionar produto a venda
                    </Button>
                </form>
            </Form>

            <Table>
                <TableCaption>Lista de produtos adicionados a venda.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Preço Unitário</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {selectedProducts.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{formatCurrency(product.price)}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{formatCurrency(product.price * product.quantity)}</TableCell>
                            <TableCell>
                                <UpsertSaleTableDropdownMenu product={JSON.parse(JSON.stringify(product))} onDelete={onDelete} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell colSpan={3}>{formatCurrency(productsTotal)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

            <SheetFooter className="pt-6">
                <Button onClick={onSubmitSale} className="w-full gap-2" disabled={selectedProducts.length === 0}>
                    <CheckIcon size={20} />
                    Finalizar venda
                </Button>
            </SheetFooter>
        </SheetContent>
    );
}

export default UpsertSheetContent;