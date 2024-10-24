"use client"

import { Loader2Icon, PlusIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../_components/ui/dialog";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import { createProductsSchema, CreateProductsSchema } from "@/app/_actions/product/create-products/schema";
import { createProduct } from "@/app/_actions/product/create-products";



const CreateProductButton = () => {

    const [dialogIsOpen, setDialogIsOpen] = useState(false)

    const form = useForm<CreateProductsSchema>({
        shouldUnregister: true,
        resolver: zodResolver(createProductsSchema),
        defaultValues: {
            name: "",
            price: 0,
            stock: 1
        }
    })

    const onSubmit = async (data: CreateProductsSchema) => {
        try {
            await createProduct(data)
            setDialogIsOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusIcon size={20} />
                    Novo Produto
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>Criar Produto</DialogTitle>
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
        </Dialog>
    );
}

export default CreateProductButton;