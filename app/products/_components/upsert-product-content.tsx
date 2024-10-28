"use client"

import { upsertProduct } from "@/app/_actions/product/upsert-products";
import { upsertProductSchema, UpsertProductSchema } from "@/app/_actions/product/upsert-products/schema";
import { Button } from "@/app/_components/ui/button";
import { DialogHeader, DialogFooter, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/app/_components/ui/dialog";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface UpsertProductsDialogContentProps {
    defaultValues?: UpsertProductSchema
    onSuccess?: () => void
}

const UpsertProductsDialogContent = ({ onSuccess, defaultValues }: UpsertProductsDialogContentProps) => {

    const form = useForm<UpsertProductSchema>({
        shouldUnregister: true,
        resolver: zodResolver(upsertProductSchema),
        defaultValues:defaultValues ?? {
            name: "",
            price: 0,
            stock: 1
        }
    })

    const isEditing = !!defaultValues

    const onSubmit = async (data: UpsertProductSchema) => {
        try {
            await upsertProduct({...data, id: defaultValues?.id})
            onSuccess?.()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <DialogContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Editar" : "Criar"} Produto</DialogTitle>
                        <DialogDescription>Insira as informações</DialogDescription>
                    </DialogHeader>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite o nome do produto" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preço</FormLabel>
                                <FormControl>
                                    <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        fixedDecimalScale
                                        decimalScale={2}
                                        prefix="R$"
                                        allowNegative={false}
                                        customInput={Input}
                                        onValueChange={(values) => field.onChange(values.floatValue)}
                                        {...field}
                                        onChange={() => { }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estoque</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Digite o estoque do produto" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="secondary" type="reset">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button disabled={form.formState.isSubmitting} type="submit" className="gap-1.5">
                            {form.formState.isSubmitting && (
                                <Loader2Icon className="animate-spin" size={16} />
                            )}
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}

export default UpsertProductsDialogContent;