import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-acess/product/get-products";
import { getSales } from "../_data-acess/sale/get-sales";
import CreateSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";

const SalesPage = async () => {
    const sales = await getSales()
    const products = await getProducts()
    const productOptions: ComboboxOption[] = products.map(product => ({
        label: product.name,
        value: product.id,
    }))

    return (
        <div className="w-full rounded-lg mx-8 mt-8 space-y-8 p-8 bg-white">
            <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-500">Gestão de Vendas</span>
                    <h2 className="text-xl font-semibold">Vendas</h2>
                </div>

                <CreateSaleButton products={products} productOptions={productOptions} />
            </div>
            <DataTable columns={saleTableColumns} data={sales} />
        </div>
    );
}

export default SalesPage;