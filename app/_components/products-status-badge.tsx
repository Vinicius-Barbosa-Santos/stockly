
import { ProductStatusDto } from "../_data-acess/product/get-products";
import { Badge } from "./ui/badge";

const getStatusLabel = (status: string) => {
    if (status === "IN_STOCK") {
        return "Em estoque"
    }

    return "Fora do estoque"
}

interface ProductStatusBadgeProps {
    status: ProductStatusDto
}

const ProductsStatusBadge = ({ status }: ProductStatusBadgeProps) => {

    const label = getStatusLabel(status)

    return (
        <Badge variant={label === "Em estoque" ? "default" : "outline"} className="gap-1.5">
            {label}
        </Badge>
    );
}

export default ProductsStatusBadge;