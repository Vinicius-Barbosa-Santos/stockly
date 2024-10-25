import { deleteProduct } from "@/app/_actions/product/delete-product";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteProductDialogContentProps {
    productId: string
}

const DeleteProductDialogContent = ({ productId }: DeleteProductDialogContentProps) => {

    const handleContinueClick = async () => {
        try {
            await deleteProduct({ id: productId })
            toast.success('Produto excluído com sucesso')
        } catch (err) {
            console.error(err)
            toast.error('Ocorreu um erro ao excluir o produto')
        }
    }

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Você deseja realmente excluir?</AlertDialogTitle>
                <AlertDialogDescription>
                    Você está prestes a excluir este produto. Esta ação não pode ser desfeita. Deseja Continuar?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleContinueClick}>Continuar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
}

export default DeleteProductDialogContent;