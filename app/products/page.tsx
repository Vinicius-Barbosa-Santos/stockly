import { DataTable } from "../_components/ui/data-table";
import { productsTableColumns } from "./_components/table-columns";
import { getProducts } from "../_data-acess/product/get-products";
import CreateProductButton from "./_components/create-products-button";

const ProductsPage = async () => {

    const products = await getProducts()

    return (
        <div className="w-full rounded-lg mx-8 mt-8 space-y-8 p-8 bg-white">
            <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-500">Gestão de Produtos</span>
                    <h2 className="text-xl font-semibold">Produtos</h2>
                </div>

                <CreateProductButton />
            </div>
            <DataTable columns={productsTableColumns} data={JSON.parse(JSON.stringify(products))} />
        </div>
    );
}

export default ProductsPage;