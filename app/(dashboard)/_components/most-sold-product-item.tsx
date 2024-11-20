import ProductsStatusBadge from "@/app/_components/products-status-badge";
import { MostSoldProductDto } from "@/app/_data-acess/dashboard/get-dashboard";
import { formatCurrency } from "@/app/_helpers/currency";


interface MostSoldProductProps {
    product: MostSoldProductDto
}

const MostSoldProductItem = ({ product }: MostSoldProductProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="space-y-[6px]">
                <ProductsStatusBadge status={product.status} />
                <p className="font-semibold">{product.name}</p>
                <p className="font-medium text-slate-500">{formatCurrency(Number(product.price))}</p>
            </div>

            <div>
                <p className="font-semibold text-sm">{product.totalSold} vendido(s)</p>
            </div>
        </div>
    );
}

export default MostSoldProductItem;