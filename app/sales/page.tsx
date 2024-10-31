import { ComboboxOption } from "../_components/ui/combobox";
import { getProducts } from "../_data-acess/product/get-products";
import CreateSaleButton from "./_components/create-sale-button";

const SalesPage = async () => {
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
            {/* <DataTable columns={productsTableColumns} data={JSON.parse(JSON.stringify(products))} /> */}
        </div>
    );
}

export default SalesPage;