"use client"

import { PlusIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "../../_components/ui/dialog";
import UpsertProductsDialogContent from "./upsert-product-content";
import { useState } from "react";



const CreateProductButton = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false)

    return (
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusIcon size={20} />
                    Novo Produto
                </Button>
            </DialogTrigger>
            <UpsertProductsDialogContent onSuccess={() => setDialogIsOpen(false)} />
        </Dialog>
    );
}

export default CreateProductButton;